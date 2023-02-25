import { testApiSuccessResponse } from "../data/test";

const getTestAPIResponse = {
  tags: ["Test"],
  description:
    "This is test API. If you get response then app is up and running.",
  responses: {
    200: {
      description:
        "This will return an object having keys [success, message, data]",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: testApiSuccessResponse,
          },
        },
      },
    },
  },
};
const testRoute = {
  "/": {
    get: getTestAPIResponse,
  },
};
export default testRoute;
