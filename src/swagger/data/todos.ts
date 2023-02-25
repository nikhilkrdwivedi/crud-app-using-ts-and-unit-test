export const getTodoApiSuccessResponse = {
  success: true,
  message: "Resource successfully fetched!",
  data: {
    _id: "63f9a8fe72e71011e1d1ff13",
    title: "Test 770",
    targetDate: "2022-10-23T00:00:00.000Z",
    status: "SCHEDULED",
    isActive: false,
    createdAt: "2023-02-25T06:21:50.430Z",
    updatedAt: "2023-02-25T06:27:31.147Z",
    __v: 0,
  },
};

export const getTodosApiSuccessResponse = {
  success: true,
  message: "Resource successfully fetched!",
  pagination: {
    totalRecords: 2,
    currentPage: 0,
    totalPages: 1,
    limit: 10,
  },
  data: [
    {
      _id: "63f9a8c472e71011e1d1ff10",
      title: "Test 1",
      targetDate: "2022-12-23T00:00:00.000Z",
      status: "SCHEDULED",
      isActive: true,
      createdAt: "2023-02-25T06:20:52.895Z",
      updatedAt: "2023-02-25T06:20:52.895Z",
      __v: 0,
    },
    {
      _id: "63f9a8fe72e71011e1d1ff13",
      title: "Test 770",
      targetDate: "2022-10-23T00:00:00.000Z",
      status: "SCHEDULED",
      isActive: false,
      createdAt: "2023-02-25T06:21:50.430Z",
      updatedAt: "2023-02-25T06:27:31.147Z",
      __v: 0,
    },
  ],
};
export const addTodoRequestBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Test 1",
    },
    description: {
      type: "string",
      example: "This is test todo",
    },
    targetDate: {
      type: "string",
      example: "2022-11-23",
    },
  },
};
export const addTodoApiSuccessResponse = {
  success: true,
  message: "Resource successfully created!",
  data: {
    title: "Test 1",
    description: "This is test todo",
    targetDate: "2022-11-23T00:00:00.000Z",
    status: "SCHEDULED",
    isActive: true,
    _id: "63f9fa7d5d2d4a98f193abf6",
    createdAt: "2023-02-25T12:09:33.498Z",
    updatedAt: "2023-02-25T12:09:33.498Z",
    __v: 0,
  },
};
export const updateTodoRequestBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Test 121",
    },
    description: {
      type: "string",
      example: "This is test todo update.",
    },
    targetDate: {
      type: "string",
      example: "2022-11-24",
    },
  },
};
export const updateTodoApiSuccessResponse = {
  success: true,
  message: "Resource successfully updated!",
  data: {
    _id: "63f9fa7d5d2d4a98f193abf6",
    title: "Test 121",
    description: "This is test todo update.",
    targetDate: "2022-10-24T00:00:00.000Z",
    status: "SCHEDULED",
    isActive: true,
    createdAt: "2023-02-25T12:09:33.498Z",
    updatedAt: "2023-02-25T12:21:53.480Z",
    __v: 0,
  },
};
export const deleteTodoRequestBody = {
  success: true,
  message: "Resource successfully deleted!",
  data: {
    _id: "63f9a8fe72e71011e1d1ff13",
    title: "Test 770",
    targetDate: "2022-10-23T00:00:00.000Z",
    status: "SCHEDULED",
    isActive: false,
    createdAt: "2023-02-25T06:21:50.430Z",
    updatedAt: "2023-02-25T12:29:31.688Z",
    __v: 0,
  },
};
export const updateTodoStatusApiSuccessResponse = {
  success: true,
  message: "Resource successfully updated!",
  data: {
    _id: "63f9a8c472e71011e1d1ff10",
    title: "Test 1",
    targetDate: "2022-12-23T00:00:00.000Z",
    status: "INPROGRESS",
    isActive: true,
    createdAt: "2023-02-25T06:20:52.895Z",
    updatedAt: "2023-02-25T14:19:24.904Z",
    __v: 0,
  },
};
export default {
  getTodoApiSuccessResponse,
  getTodosApiSuccessResponse,
  addTodoRequestBody,
  addTodoApiSuccessResponse,
  updateTodoRequestBody,
  updateTodoApiSuccessResponse,
  deleteTodoRequestBody,
  updateTodoStatusApiSuccessResponse,
};
