import { Request, Response } from "express";

export const getTodos = async (request: Request, response: Response) => {
  return response.status(200).json({ data: new Date() });
};
export const getTodo = async (request: Request, response: Response) => {};

export default { getTodos, getTodo };
