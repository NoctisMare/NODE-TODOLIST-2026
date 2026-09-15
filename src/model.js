import mongoose from "mongoose";

export const STATUS = Object.freeze({
  COMPLETED: "completed",
  PENDING: "pending",
});

const transformFunction = (doc, ret) => {
  const { __v } = ret || {};
  return ret;
};

const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: transformFunction,
    },
    toObject: {
      virtuals: true,
      transform: transformFunction,
    },
  },
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
