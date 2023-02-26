import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../../utils/server";
import httpResponseMessages from "../../constants/httpResponseMessages";
import { TODOS_STATUS } from "../../constants/todos";
export const app = createServer();
describe(`Todos CRUD API unit tests`, () => {
  const wrongTodoId = "wrongTodoId";
  let loggedInUserDetails: {
    token: string;
    user: any;
  };
  const createToDoPayload = {
    title: "My todo test",
    description: "I am testing todo",
    targetDate: "2023-12-10",
  };
  let newlyCreatedTodo: any;
  let newlyUpdatedTodo: any;

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const createUserPayload = {
      email: "nikhil@outlook.com",
      password: "Nikhil123.@",
      name: "Nikhil Kumar",
    };
    const loginCredentials = {
      email: "nikhil@outlook.com",
      password: "Nikhil123.@",
    };
    await request(app)
      .post("/api/v1/authentications/register")
      .send(createUserPayload);

    const {
      body: {
        data: { user, token },
      },
    } = await request(app)
      .post("/api/v1/authentications/login")
      .send(loginCredentials);
    loggedInUserDetails = {
      user,
      token,
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe(`POST API CALL: WRITE OPERATIONS`, () => {
    it("should return list of todos of logged in user", async () => {
      const { body, statusCode } = await request(app)
        .post("/api/v1/todos")
        .send(createToDoPayload)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.CREATE_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      newlyCreatedTodo = body.data;
    });
  });

  describe(`GET API CALL: READ OPERATIONS`, () => {
    it("should return list of todos of logged in user", async () => {
      const { body, statusCode } = await request(app)
        .get("/api/v1/todos")
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.FETCH_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(body.data.length).toBe(1);
    });

    it("should return todo of logged in user by todoId", async () => {
      const _id = newlyCreatedTodo?._id;
      const { body, statusCode } = await request(app)
        .get(`/api/v1/todos/${_id}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);
      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.FETCH_SUCCESS,
      });
      expect(body.success).toBeTruthy();
    });

    it("shouldn't return todo of logged in user by todoId because wrong todoId", async () => {
      const { body, statusCode } = await request(app)
        .get(`/api/v1/todos/${wrongTodoId}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);
      expect(statusCode).toBe(400);
      expect(body).toMatchObject({
        message: httpResponseMessages.BAD_REQUEST,
      });
      expect(body.success).toBeFalsy();
    });

    it("shouldn't return todo of logged in user by todoId because todoId not exists in db", async () => {
      const dummyId = new mongoose.Types.ObjectId();
      const { body, statusCode } = await request(app)
        .get(`/api/v1/todos/${dummyId}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.FETCH_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(body.data).toBeNull();
    });
  });

  describe(`PUT API CALL: UPDATE OPERATIONS`, () => {
    it("should return updated todo of logged in user", async () => {
      const _id = newlyCreatedTodo?._id;
      const updateTodo = {
        title: "My update todo test",
        description: "I am testing todo update",
        targetDate: "2023-12-11",
      };

      const {
        body,
        body: { data },
        statusCode,
      } = await request(app)
        .put(`/api/v1/todos/${_id}`)
        .send(updateTodo)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.UPDATE_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(data.title).toBe(updateTodo.title);
      expect(data.description).toBe(updateTodo.description);
      expect(data.targetDate).toContain(updateTodo.targetDate);
    });
  });

  describe(`PATCH API CALL: UPDATE STATUS`, () => {
    it(`should return updated status ${TODOS_STATUS.SCHEDULED} -> ${TODOS_STATUS.INPROGRESS} todo of logged in user`, async () => {
      const _id = newlyCreatedTodo?._id;

      const {
        body,
        body: { data },
        statusCode,
      } = await request(app)
        .patch(`/api/v1/todos/${_id}/status/${TODOS_STATUS.INPROGRESS}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.UPDATE_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(data.status).toBe(TODOS_STATUS.INPROGRESS);
      expect(data._id).toBe(_id);
    });

    it(`should return updated status ${TODOS_STATUS.INPROGRESS} -> ${TODOS_STATUS.COMPLETED} todo of logged in user`, async () => {
      const _id = newlyCreatedTodo?._id;

      const {
        body,
        body: { data },
        statusCode,
      } = await request(app)
        .patch(`/api/v1/todos/${_id}/status/${TODOS_STATUS.COMPLETED}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.UPDATE_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(data.status).toBe(TODOS_STATUS.COMPLETED);
      expect(data._id).toBe(_id);
      expect(data.completionDate).toBeTruthy();
    });
  });

  describe(`DELETE API CALL: SOFT DELETE`, () => {
    it(`should delete todo of logged in user`, async () => {
      const _id = newlyCreatedTodo?._id;

      const {
        body,
        body: { data },
        statusCode,
      } = await request(app)
        .delete(`/api/v1/todos/${_id}`)
        .set("authorization", `Bearer ${loggedInUserDetails.token}`);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: httpResponseMessages.DELETED_SUCCESS,
      });
      expect(body.success).toBeTruthy();
      expect(data.status).toBe(TODOS_STATUS.COMPLETED);
      expect(data._id).toBe(_id);
      expect(data.isActive).toBe(false);
    });
  });
});
