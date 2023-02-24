import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import environment from "./configuration/environment";
import toDoRouter from "./routes/todos";

const app: Express = express();

app.use("/api/v1/todos/", toDoRouter);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    successMsg: `Server is running and current timestamp ${new Date()}`,
  });
});

const startApp = async () => {
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
