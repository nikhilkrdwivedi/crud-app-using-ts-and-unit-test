// const config = require("../config");

import environment from "../configurations/environment";
import todoRoutes from "./api/todos";
import testRoute from "./api/test";
// const stakePool = require("./stake-pool");
// const contractDetails = require("./contract-details");
// const networkDetails = require("./network-details");
// const projectsV2Docs = require("./projects-v2");
// const projectDetails = require("./project-details");
// const tokenomicsDetails = require("./tokenomics-details");
// const metalaunchScreeningDetails = require("./metalaunch-screening");
// const ClaimLaunched = require("./claim-launched");
// const clientProjects = require("./client-projects");
// const featuredprojects = require("./featured-projects");
// const userProfile = require("./user-profile");
// const investment = require("./investment");
const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Official INeuron Documentations",
    version: "1.0.0",
    description: "This is official documentations for INeuron.",
  },
  servers: [
    {
      url: environment.SERVER,
      description: "backend server",
    },
  ],
  paths: {
    ...testRoute,
    ...todoRoutes,
  },
};
export default swaggerDocs;
