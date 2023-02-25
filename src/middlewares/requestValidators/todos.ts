import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { error } from "./response";

const addTodoRequestSchema = {
  title: joi.string().trim().required(),
  description: joi.string().trim().optional(),
  targetDate: joi.date().required(),
};

const updateTodoRequestSchema = {
  title: joi.string().trim().optional(),
  description: joi.string().trim().optional(),
  targetDate: joi.date().optional(),
  completionDate: joi.date().optional(),
  status: joi
    .string()
    .allow("SCHEDULED", "INPROGRESS", "COMPLETED")
    .trim()
    .optional(),
  author: joi.string().optional(),
  isActive: joi.boolean().optional(),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
  __v: joi.number().optional(),
};

const paramsRequestSchema = {
  todoId: joi.string().min(24).trim().required(),
  status: joi
    .string()
    .allow("SCHEDULED", "INPROGRESS", "COMPLETED")
    .trim()
    .optional(),
};

export const addTodoValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reqBodySchema = joi.object(addTodoRequestSchema);
  const reqBodyValidation = reqBodySchema.validate(request.body);
  if (reqBodyValidation.error) {
    return error(reqBodyValidation.error, response);
  } else {
    next();
  }
};

export const updateTodoValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reqBodySchema = joi.object(updateTodoRequestSchema);
  const reqBodyValidation = reqBodySchema.validate(request.body);
  console.log(reqBodyValidation);
  if (reqBodyValidation.error) {
    return error(reqBodyValidation.error, response);
  }
  next();
};

export const validateParams = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestParamsSchema = joi.object(paramsRequestSchema);
  const requestParamsValidation = requestParamsSchema.validate(request.params);
  console.log(requestParamsValidation);
  if (requestParamsValidation.error) {
    return error(requestParamsValidation.error, response);
  } else {
    next();
  }
};

export default {
  addTodoValidation,
  updateTodoValidation,
  validateParams,
};
