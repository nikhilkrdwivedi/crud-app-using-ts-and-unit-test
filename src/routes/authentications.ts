import { Router } from "express";
import controller from "../controllers/authentications";
import validator from "../middlewares/requestValidators/authentications";
const authenticationRouter: Router = Router();

authenticationRouter.post(
  "/register",
  validator.registerValidation,
  controller.register
);
authenticationRouter.post(
  "/login",
  validator.loginValidation,
  controller.login
);
authenticationRouter.post("/logout", controller.logout);
authenticationRouter.get("/validate-token", controller.validateToken);

export default authenticationRouter;
