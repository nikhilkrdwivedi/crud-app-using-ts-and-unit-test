import swagger from "swagger-ui-express";

import environment from "./configurations/environment";

import swaggerDocs from "./swagger/docs";
import dbConnect from "./utils/dbConnect";
import createServer from "./utils/server";

const app = createServer();
app.use("/docs", swagger.serve);
app.use("/docs", swagger.setup(swaggerDocs));

app.listen(environment.PORT, async () => {
  console.log(`Server started on PORT [${environment.PORT}]`);
  await dbConnect();
});
