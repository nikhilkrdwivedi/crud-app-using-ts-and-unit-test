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
import httpResponseMessages from "../constants/httpResponseMessages";
import { transformTodoUpdatePayload } from "../helpers/todos";
import { TODOS_STATUS } from "../constants/todos";

export const getTodos = async (request: CustomRequest, response: Response) => {
  try {
    const query = { author: request?.user?._id };
    const { skip, limit, currentPage } = getPaginationQueryData(request.query);
    const [data, total] = await Promise.all([
      fetch(query, skip, limit),
      countDocuments(query),
    ]);
    const pagination = getPaginationInfo(total, limit, currentPage);

    return response.status(200).json({
      success: true,
      message: httpResponseMessages.FETCH_SUCCESS,
      pagination,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
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
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
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
      message: httpResponseMessages.CREATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
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
      message: httpResponseMessages.UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
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
      message: httpResponseMessages.DELETED_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};
export const updateTodoStatus = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let { todoId, status } = request.params;
    if (!status) {
      return response.status(200).json({
        success: true,
        message: httpResponseMessages.STATUS_MISSING,
        data: null,
      });
    }
    let payload = {};
    const query = { todoId, author: request?.user?._id };
    status = status?.toUpperCase();

    if (status === TODOS_STATUS.COMPLETED) {
      payload = {
        ...payload,
        status: TODOS_STATUS.COMPLETED,
        completionDate: new Date(),
      };
    }

    if (status === TODOS_STATUS.INPROGRESS) {
      payload = {
        status: TODOS_STATUS.INPROGRESS,
      };
    }

    if (status === TODOS_STATUS.SCHEDULED) {
      payload = {
        status: TODOS_STATUS.SCHEDULED,
        completionDate: null,
      };
    }

    const data = await update(query, payload);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export default {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
};
