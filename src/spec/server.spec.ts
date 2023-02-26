import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import httpResponseMessages from "../constants/httpResponseMessages";
export const app = createServer();

describe(`APP should say ${httpResponseMessages.SERVER_UP_AND_RUNNING}`, () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  it("should return 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: httpResponseMessages.SERVER_UP_AND_RUNNING,
    });
    expect(response.body.success).toBeTruthy();
  });
});
