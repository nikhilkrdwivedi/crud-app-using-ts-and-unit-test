import { Router } from "express";
import { getTodos, getTodo } from "../controllers/todos";

const toDoRouter = Router();

toDoRouter.get("/", getTodos);
toDoRouter.get("/:toDoId", getTodo);

export default toDoRouter;
