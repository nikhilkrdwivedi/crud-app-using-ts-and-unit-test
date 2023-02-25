import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { error } from "./response";

const loginRequestSchema = {
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
};
const registerRequestSchema = {
  ...loginRequestSchema,
  name: joi.string().trim().required(),
};

export const loginValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestBodySchema = joi.object(loginRequestSchema);
  const requestBodyValidation = requestBodySchema.validate(request.body);
  if (requestBodyValidation.error) {
    return error(requestBodyValidation.error, response);
  } else {
    next();
  }
};
export const registerValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestBodySchema = joi.object(registerRequestSchema);
  const requestBodyValidation = requestBodySchema.validate(request.body);
  if (requestBodyValidation.error) {
    return error(requestBodyValidation.error, response);
  } else {
    next();
  }
};
export default {
  loginValidation,
  registerValidation,
};
