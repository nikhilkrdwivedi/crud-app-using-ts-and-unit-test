import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import swagger from "swagger-ui-express";

import environment from "./configurations/environment";
import httpResponseMessages from "./constants/httpResponseMessages";
import authenticationRouter from "./routes/authentications";
import todoRouter from "./routes/todos";
import swaggerDocs from "./swagger/docs";

const app: Express = express();

//middleware
app.use(express.json());
app.use("/docs", swagger.serve);
app.use("/docs", swagger.setup(swaggerDocs));

app.use("/api/v1/todos/", todoRouter);
app.use("/api/v1/authentications/", authenticationRouter);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: httpResponseMessages.SERVER_UP_AND_RUNNING,
    data: new Date(),
  });
});

const startApp = () => {
  try {
    // Connection With DB
    mongoose.connect(environment.mongoURI, environment.mongoOptions);
    console.log(
      `Mongoose default connection is open to ${environment.mongoURI}`
    );
    // Start Listening for the server on PORT
    app.listen(environment.PORT, () =>
      console.log(`Server started on PORT ${environment.PORT} `)
    );
  } catch (err) {
    console.log(`Mongoose default connection has occurred ${err} error`);
    startApp();
  }
};

startApp();
