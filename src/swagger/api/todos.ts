import {
  addTodoRequestBody,
  addTodoApiSuccessResponse,
  getTodoApiSuccessResponse,
  getTodosApiSuccessResponse,
  updateTodoRequestBody,
  updateTodoApiSuccessResponse,
  deleteTodoRequestBody,
  updateTodoStatusApiSuccessResponse,
} from "../data/todos";
import { internalServerError } from "../data/httpErrors";

const getTodos = {
  tags: ["Todos"],
  description: "This is GET API. You can get all todos of logged in user.",
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data].",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: getTodosApiSuccessResponse,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
  },
};
const getTodo = {
  tags: ["Todos"],
  description:
    "This is GET API. You can get todo by todo id of logged in user.",
  parameters: [
    {
      name: "todoId",
      in: "path",
      type: "string",
      required: true,
      description: "todo id",
      example: "63f9a8fe72e71011e1d1ff13",
    },
  ],
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data].",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: getTodoApiSuccessResponse,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
  },
};

const addTodo = {
  tags: ["Todos"],
  description: "This is POST API. You can add todo of logged in user",
  requestBody: {
    content: {
      "application/json": {
        schema: addTodoRequestBody,
      },
    },
  },
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data]",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: addTodoApiSuccessResponse,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
    // 401: {
    //   description: "This will return an object having keys [errorMsg]",
    //   content: {
    //     "application/json": {
    //       schema: unauthorizedErrorObj,
    //     },
    //   },
    // },
  },
};
const updateTodo = {
  tags: ["Todos"],
  description:
    "This is PUT API. You can update todo of logged in user. Note: Black listed properties: ['_id', '__v', 'status', 'isActive', 'author', 'completionDate']. You can't update these properties by this API.",
  parameters: [
    {
      name: "todoId",
      in: "path",
      type: "string",
      required: true,
      description: "todo id",
      example: "63f9fa7d5d2d4a98f193abf6",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: updateTodoRequestBody,
      },
    },
  },
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data]",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: updateTodoApiSuccessResponse,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
    // 401: {
    //   description: "This will return an object having keys [errorMsg]",
    //   content: {
    //     "application/json": {
    //       schema: unauthorizedErrorObj,
    //     },
    //   },
    // },
  },
};
const updateTodoStatus = {
  tags: ["Todos"],
  description:
    "This is PATCH API. You can update status of todo of logged in user. Note: todo statuses are ['SCHEDULED', 'INPROGRESS', 'COMPLETED']",
  parameters: [
    {
      name: "todoId",
      in: "path",
      type: "string",
      required: true,
      description: "todo id",
      example: "63f9fa7d5d2d4a98f193abf6",
    },
    {
      name: "status",
      in: "path",
      type: "string",
      required: true,
      description: "todo status",
      example: "INPROGRESS",
    },
  ],
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data]",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: updateTodoStatusApiSuccessResponse,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
    // 401: {
    //   description: "This will return an object having keys [errorMsg]",
    //   content: {
    //     "application/json": {
    //       schema: unauthorizedErrorObj,
    //     },
    //   },
    // },
  },
};
const deleteTodo = {
  tags: ["Todos"],
  description:
    "This is DELETE API. You can delete todo of logged in user. Note: This is SOFT DELETE. Document will exist in database.",
  parameters: [
    {
      name: "todoId",
      in: "path",
      type: "string",
      required: true,
      description: "todo id",
      example: "63f9a8fe72e71011e1d1ff13",
    },
  ],
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data]",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: deleteTodoRequestBody,
          },
        },
      },
    },
    500: {
      description:
        "This will return an object having keys [success, message, error]",
      content: {
        "application/json": {
          schema: internalServerError,
        },
      },
    },
    // 401: {
    //   description: "This will return an object having keys [errorMsg]",
    //   content: {
    //     "application/json": {
    //       schema: unauthorizedErrorObj,
    //     },
    //   },
    // },
  },
};
const todosRoute = {
  "/api/v1/todos": {
    get: getTodos,
    post: addTodo,
  },
  "/api/v1/todos/{todoId}": {
    get: getTodo,
    put: updateTodo,
    delete: deleteTodo,
  },
  "/api/v1/todos/{todoId}/status/{status}": {
    patch: updateTodoStatus,
  },
};
export default todosRoute;
