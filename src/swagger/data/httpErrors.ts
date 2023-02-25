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
const unauthorizedErrorObj = {
  type: "object",
  example: { errorMsg: `No token available, please login again!` },
};

export default { internalServerError };
