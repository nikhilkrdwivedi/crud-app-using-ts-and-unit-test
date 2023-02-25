import * as dotenv from "dotenv";
dotenv.config();

// Export the enviroment object
export const environment: any = {
  PORT: process.env.PORT || 3020,
  mongoURI: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/todo-demo",
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  SERVER: process.env.SERVER || `http://localhost:3020`,
  JWT_SECRET: process.env.JWT_SECRET || "ManVsWildIsAwsomeShow",
};

export default environment;
