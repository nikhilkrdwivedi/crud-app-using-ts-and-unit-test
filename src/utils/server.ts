import express, { Express, Request, Response } from "express";
import httpResponseMessages from "../constants/httpResponseMessages";
import authenticationRouter from "../routes/authentications";
import todoRouter from "../routes/todos";
import morgan from "morgan";

export function createServer() {
  const app: Express = express();
  app.use(express.json());
  app.use(morgan("dev"));
  // Route endpoints
  app.use("/api/v1/todos/", todoRouter);
  app.use("/api/v1/authentications/", authenticationRouter);

  app.get("/", (request: Request, response: Response) => {
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.SERVER_UP_AND_RUNNING,
      data: new Date(),
    });
  });
  return app;
}

export default createServer;
