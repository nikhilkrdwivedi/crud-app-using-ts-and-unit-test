import httpResponseMessages from "../../constants/httpResponseMessages";

export const testApiSuccessResponse = {
  success: true,
  message: httpResponseMessages.SERVER_UP_AND_RUNNING,
  data: new Date(),
};
