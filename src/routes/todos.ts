import { Router } from "express";
import controllers from "../controllers/todos";
import validator from "../middlewares/requestValidators/todos";
import { validateToken } from "../middlewares/validateToken";
const todoRouter: Router = Router();

todoRouter.get("/", validateToken, controllers.getTodos);
todoRouter.get(
  "/:todoId",
  validateToken,
  validator.validateParams,
  controllers.getTodo
);
todoRouter.post(
  "/",
  validateToken,
  validator.addTodoValidation,
  controllers.addTodo
);
todoRouter.patch(
  "/:todoId/status/:status",
  validateToken,
  validator.validateParams,
  controllers.updateTodoStatus
);
todoRouter.put(
  "/:todoId",
  validateToken,
  validator.validateParams,
  validator.updateTodoValidation,
  controllers.updateTodo
);
todoRouter.delete(
  "/:todoId",
  validateToken,
  validator.validateParams,
  controllers.deleteTodo
);

export default todoRouter;
