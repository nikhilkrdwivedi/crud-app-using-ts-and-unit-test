export const internalServerError = {
  type: "object",
  example: {
    success: false,
    message: "Internal Server Error!",
    error: {
      stringValue: '"11"',
      valueType: "string",
      kind: "ObjectId",
      value: "11",
      path: "_id",
      reason: {},
      name: "CastError",
      message:
        'Cast to ObjectId failed for value "11" (type string) at path "_id" for model "todos"',
    },
  },
};

export const unAuthorizedError = {
  type: "object",
  example: {
    success: false,
    message: "Access is denied, please login again!",
    error: null,
  },
};
export const badRequest = {
  type: "object",
  example: {
    success: false,
    message: "Bad request, please try again!",
    error: "Email is required!",
  },
};

export const commonHttpErrors = {
  401: {
    description:
      "This will return an object having keys [success, message, error]",
    content: {
      "application/json": {
        schema: unAuthorizedError,
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
};

export const badRequestError = {
  400: {
    description:
      "This will return an object having keys [success, message, error]",
    content: {
      "application/json": {
        schema: badRequest,
      },
    },
  },
};

export const conflictRequest = {
  type: "object",
  example: {
    success: false,
    message:
      "Hey, are you sure you haven't used this email before. Please login!",
    error: {
      name: "Nikhil Kumar",
      email: "authornikhildwivedi@gmail.com",
      password: "123Nikhil@Nikhil123",
    },
  },
};

export const conflictError = {
  409: {
    description:
      "This will return an object having keys [success, message, error]",
    content: {
      "application/json": {
        schema: conflictRequest,
      },
    },
  },
};

export const logoutRequest = {
  type: "object",
  example: {
    success: false,
    message: "Logout denied, please send auth token!",
    error: null,
  },
};

export const logoutDeniedError = {
  401: {
    description:
      "This will return an object having keys [success, message, error]",
    content: {
      "application/json": {
        schema: logoutRequest,
      },
    },
  },
};

export default {
  internalServerError,
  unAuthorizedError,
  commonHttpErrors,
  badRequestError,
  logoutDeniedError,
};
