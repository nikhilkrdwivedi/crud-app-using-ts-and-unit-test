import mongoose from "mongoose";
import environment from "../configurations/environment";

async function dbConnect() {
  try {
    // Connection With DB
    mongoose.connect(environment.mongoURI, environment.mongoOptions);
    console.log(
      `Mongoose default connection is open to ${environment.mongoURI}`
    );
  } catch (err) {
    console.log(`Mongoose default connection has occurred ${err} error`);
    process.exit(1);
  }
}

export default dbConnect;
