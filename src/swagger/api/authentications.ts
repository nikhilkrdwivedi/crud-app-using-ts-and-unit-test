import {
  commonHttpErrors,
  badRequestError,
  internalServerError,
  conflictError,
  logoutDeniedError,
} from "../data/httpErrors";

import {
  loginUserRequestBody,
  logoutSuccess,
  registerNewUserRequestBody,
  registerNewUserSuccess,
  validateTokenSuccess,
} from "../data/authentications";

const validateToken = {
  tags: ["Authentications"],
  description: "This is GET API. You can validate token of logged in users",
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data].",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: validateTokenSuccess,
          },
        },
      },
    },
    ...commonHttpErrors,
  },
};

const logout = {
  tags: ["Authentications"],
  description: "This is GET API. User can logout using this API",
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data].",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: logoutSuccess,
          },
        },
      },
    },
    ...logoutDeniedError,
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

const register = {
  tags: ["Authentications"],
  description: "This is POST API. You can add new user.",
  requestBody: {
    content: {
      "application/json": {
        schema: registerNewUserRequestBody,
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
            example: registerNewUserSuccess,
          },
        },
      },
    },
    ...badRequestError,
    ...conflictError,
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

const login = {
  tags: ["Authentications"],
  description: "This is POST API. You can add new user.",
  requestBody: {
    content: {
      "application/json": {
        schema: loginUserRequestBody,
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
            example: registerNewUserSuccess,
          },
        },
      },
    },
    ...badRequestError,
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

const authenticationsRoute = {
  "/api/v1/authentications/register": {
    post: register,
  },
  "/api/v1/authentications/login": {
    post: login,
  },
  "/api/v1/authentications/logout": {
    get: logout,
  },
  "/api/v1/authentications/validate-token": {
    get: validateToken,
  },
};

export default authenticationsRoute;
