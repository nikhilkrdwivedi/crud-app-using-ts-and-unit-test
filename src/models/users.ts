import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    tokens: [{ type: String, trim: true }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`users`, userSchema, `users`);
