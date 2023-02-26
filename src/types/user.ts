import { ObjectId } from "mongoose";

export interface User {
  _id: string | any;
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  token?: string[];
}
