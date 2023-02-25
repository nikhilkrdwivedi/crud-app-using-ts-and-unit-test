import { Router } from "express";
import controllers from "../controllers/todos";
import validator from "../middlewares/requestValidators/todos";
const todoRouter: Router = Router();

todoRouter.get("/", controllers.getTodos);
todoRouter.get("/:todoId", validator.validateParams, controllers.getTodo);
todoRouter.post("/", validator.addTodoValidation, controllers.addTodo);
todoRouter.patch(
  "/:todoId/status/:status",
  validator.validateParams,
  controllers.updateTodoStatus
);
todoRouter.put(
  "/:todoId",
  validator.validateParams,
  validator.updateTodoValidation,
  controllers.updateTodo
);
todoRouter.delete("/:todoId", validator.validateParams, controllers.deleteTodo);

export default todoRouter;
