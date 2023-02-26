export const registerNewUserRequestBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Nikhil Kumar",
    },
    email: {
      type: "string",
      example: "authornikhildwivedi@gmail.com",
    },
    password: {
      type: "string",
      example: "123Nikhil@Nikhil123",
    },
  },
};

export const loginUserRequestBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "authornikhildwivedi@gmail.com",
    },
    password: {
      type: "string",
      example: "123Nikhil@Nikhil123",
    },
  },
};

export const registerNewUserSuccess = {
  success: true,
  message: "User successfully created!",
  data: {
    user: {
      _id: "63fb62dd7bc36b37f30b1f62",
      name: "Nikhil Kumar",
      email: "authornikhildwivedi@gmail.com",
      password: "$2b$10$uafoYmcIU1gxUMSiGnqMC.GNb32w04jImzeGtuiX9wSvMBAPVXKau",
      tokens: [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZiNjJkZDdiYzM2YjM3ZjMwYjFmNjIiLCJpYXQiOjE2Nzc0MTkyMjksImV4cCI6MTY4NTE5NTIyOX0.uXIbz_xaNisS3Dy-r7Jy6SYpbu_jOQqNZZhDvEdCSbk",
      ],
      isActive: true,
      createdAt: "2023-02-26T13:47:09.595Z",
      updatedAt: "2023-02-26T13:47:09.646Z",
      __v: 0,
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZiNjJkZDdiYzM2YjM3ZjMwYjFmNjIiLCJpYXQiOjE2Nzc0MTkyMjksImV4cCI6MTY4NTE5NTIyOX0.uXIbz_xaNisS3Dy-r7Jy6SYpbu_jOQqNZZhDvEdCSbk",
  },
};

export const validateTokenSuccess = {
  success: true,
  message: "Token is valid!",
  data: {
    _id: "63fb62dd7bc36b37f30b1f62",
    name: "Nikhil Kumar",
    email: "authornikhildwivedi@gmail.com",
    isActive: true,
    createdAt: "2023-02-26T13:47:09.595Z",
    updatedAt: "2023-02-26T13:58:30.090Z",
    __v: 0,
  },
};

export const logoutSuccess = {
  success: true,
  message: "User successfully logged out!",
  data: {},
};

export default {
  registerNewUserRequestBody,
  loginUserRequestBody,
  registerNewUserSuccess,
  validateTokenSuccess,
  logoutSuccess,
};
