import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../../utils/server";
import httpResponseMessages from "../../constants/httpResponseMessages";
import { removeKeyFromObject } from "../../helpers/removeKeyFromObject";
export const app = createServer();

describe(`Authentications CRUD API unit tests`, () => {
  const createUserPayload = {
    email: "nikhil@outlook.com",
    password: "Nikhil123.@",
    name: "Nikhil Kumar",
  };
  const loginCredentials = {
    email: "nikhil@outlook.com",
    password: "Nikhil123.@",
  };
  const loginWrongCredentials = {
    email: "nikhil@outlook.com",
    password: "Nikhil1234.@",
  };
  const invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZhZmQyOWFiMjdmMjRkY2Y0MzMxZDkiLCJpYXQiOjE2NzczOTMxOTMsImV4cCI6MTY4NTE2OTE5M30.LgAufcK6PnhPtqpQTgkjIdlglP-f8L0eXLuWThAZuSQ";
  let loggedInUserDetails: {
    user: any;
    token: string;
  };

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe(`CREATE USER POST CALL`, () => {
    it("should create user", async () => {
      const {
        body,
        statusCode,
        body: {
          data: { user, token },
        },
      } = await request(app)
        .post("/api/v1/authentications/register")
        .send(createUserPayload);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.USER_CREATED,
        success: true,
      });
      expect(user.name).toBe(createUserPayload.name);
      expect(user.email).toBe(createUserPayload.email);
      expect(token?.length).toBeGreaterThan(0);
    });
    it("shouldn't create user, user is already exists", async () => {
      const { body, statusCode } = await request(app)
        .post("/api/v1/authentications/register")
        .send(createUserPayload);
      expect(statusCode).toBe(409);
      expect(body).toMatchObject({
        message: httpResponseMessages.USER_ALREADY_EXIST,
        success: false,
      });
    });
    it("shouldn't create user, email didn't send in payload", async () => {
      let wrongPayload = removeKeyFromObject(["email"], {
        ...createUserPayload,
      });
      const { body, statusCode } = await request(app)
        .post("/api/v1/authentications/register")
        .send(wrongPayload);
      expect(statusCode).toBe(400);
      expect(body).toMatchObject({
        message: httpResponseMessages.BAD_REQUEST,
        success: false,
        error: httpResponseMessages.EMAIL_REQUIRED,
      });
    });
    it("shouldn't create user, name didn't send in payload", async () => {
      let wrongPayload = removeKeyFromObject(["name"], {
        ...createUserPayload,
      });
      const { body, statusCode } = await request(app)
        .post("/api/v1/authentications/register")
        .send(wrongPayload);
      expect(statusCode).toBe(400);
      expect(body).toMatchObject({
        message: httpResponseMessages.BAD_REQUEST,
        success: false,
        error: httpResponseMessages.NAME_REQUIRED,
      });
    });
    it("shouldn't create user, password didn't send in payload", async () => {
      let wrongPayload = removeKeyFromObject(["password"], {
        ...createUserPayload,
      });
      const { body, statusCode } = await request(app)
        .post("/api/v1/authentications/register")
        .send(wrongPayload);
      expect(statusCode).toBe(400);
      expect(body).toMatchObject({
        message: httpResponseMessages.BAD_REQUEST,
        success: false,
        error: httpResponseMessages.PASSWORD_REQUIRED,
      });
    });
  });
  describe(`LOGIN USER POST CALL`, () => {
    it("should allow to login user", async () => {
      const {
        body,
        statusCode,
        body: {
          data: { user, token },
        },
      } = await request(app)
        .post("/api/v1/authentications/login")
        .send(loginCredentials);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.LOGIN_SUCCESS,
        success: true,
      });
      expect(user.email).toBe(loginCredentials.email);
      expect(token?.length).toBeGreaterThan(0);
      loggedInUserDetails = { user, token };
    });
    it("should not allow to login user, invalid credentials", async () => {
      const {
        body,
        statusCode,
        body: {
          data: { user, token },
        },
      } = await request(app)
        .post("/api/v1/authentications/login")
        .send(loginWrongCredentials);

      expect(statusCode).toBe(401);
      expect(body).toMatchObject({
        message: httpResponseMessages.LOGIN_ERROR,
        success: false,
      });
    });
  });
  describe(`VALIDATE USER AUTH TOKEN GET CALL`, () => {
    it("should validate user token : SUCCESS", async () => {
      const {
        body,
        statusCode,
        body: { data },
      } = await request(app)
        .get("/api/v1/authentications/validate-token")
        .set("authorization", `Bearer ${loggedInUserDetails?.token || ""}`);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.VALID_TOKEN,
        success: true,
      });
      expect(data.email).toBe(loginCredentials.email);
    });

    it("should validate user token : FAILURE", async () => {
      const { body, statusCode } = await request(app)
        .get("/api/v1/authentications/validate-token")
        .set("authorization", `Bearer ${invalidToken}`);
      expect(statusCode).toBe(500);
      expect(body).toMatchObject({
        message: httpResponseMessages.INTERNAL_SERVER_ERROR,
        success: false,
        error: { name: "JsonWebTokenError", message: "invalid signature" },
      });
    });
  });
});
