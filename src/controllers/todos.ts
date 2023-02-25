import { Request, Response } from "express";

import {
  getPaginationQueryData,
  getPaginationInfo,
} from "../helpers/pagination";
import {
  fetch,
  countDocuments,
  fetchById,
  create,
  update,
  deleteById,
} from "../providers/todos";
import { CustomRequest } from "../types/customRequest";
import HttpResponse from "../constants/httpResponse";
import { transformTodoUpdatePayload } from "../helpers/todos";
import httpResponseMessages from "../constants/httpResponse";

export const getTodos = async (request: CustomRequest, response: Response) => {
  try {
    const query = { author: request?.user?._id };
    const { skip, limit, currentPage } = await getPaginationQueryData(
      request.query
    );
    const [data, total] = await Promise.all([
      fetch(query, skip, limit),
      countDocuments(query),
    ]);
    const pagination = await getPaginationInfo(total, limit, currentPage);

    return response.status(200).json({
      success: true,
      message: httpResponseMessages.FETCH_SUCCESS,
      data,
      pagination,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: HttpResponse.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const getTodo = async (request: CustomRequest, response: Response) => {
  try {
    const { todoId } = request.params;
    const optionalQuery = { author: request?.user?._id };
    const data = await fetchById(todoId, optionalQuery);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.FETCH_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: HttpResponse.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const addTodo = async (request: CustomRequest, response: Response) => {
  try {
    let requestPayload = request.body;
    requestPayload = {
      ...requestPayload,
      author: request?.user?._id,
    };
    const data = await create(requestPayload);
    return response.status(200).json({
      success: true,
      message: HttpResponse.CREATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: HttpResponse.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const updateTodo = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let requestPayload = request.body;
    requestPayload = transformTodoUpdatePayload(requestPayload);
    const { todoId } = request.params;
    const query = { _id: todoId, author: request?.user?._id };
    const data = await update(query, requestPayload);
    return response.status(200).json({
      success: true,
      message: HttpResponse.UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: HttpResponse.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const deleteTodo = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const { todoId } = request.params;
    const optionalQuery = { author: request?.user?._id };
    const data = await deleteById(todoId, optionalQuery);
    return response.status(200).json({
      success: true,
      message: HttpResponse.DELETED_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: HttpResponse.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export default { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
