import environment from "../configurations/environment";
import todoRoute from "./api/todos";
import testRoute from "./api/test";
import authenticationsRoute from "./api/authentications";

const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Official INeuron Documentations",
    version: "1.0.0",
    description: "This is official documentations for INeuron.",
  },
  servers: [
    {
      url: "http://3.111.226.44:3020",
      description: "Backend server",
    },
    {
      url: environment.SERVER,
      description: "Dev server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...testRoute,
    ...authenticationsRoute,
    ...todoRoute,
  },
};
export default swaggerDocs;
