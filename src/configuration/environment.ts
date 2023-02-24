import * as dotenv from "dotenv";
dotenv.config();

// Export the enviroment object
export const environment: any = {
  PORT: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/todo-demo",
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default environment;
