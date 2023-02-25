import mongoose from "mongoose";
const { Schema, model } = mongoose;
const TodoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    targetDate: {
      type: Date,
      trim: true,
      default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
    completionDate: {
      type: Date,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "SCHEDULED",
      enum: ["SCHEDULED", "INPROGRESS", "COMPLETED"],
    },
    author: { type: Schema.Types.ObjectId, ref: "users" },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`todos`, TodoSchema, `todos`);
