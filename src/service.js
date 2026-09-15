import mongoose from "mongoose";
import * as TodoRepo from "./repo.js";

function InvalidIDErrorCheck(id) {
  if (!id) {
    const error = new Error("No Todo ID Specified.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid Todo ID.");
    error.statusCode = 401;
    throw error;
  }
}

function TodoNotFoundError(todo) {
  if (!todo) {
    const error = new Error("Todo Not Found.");
    error.statusCode = 404;
    throw error;
  }
}

export const FetchAll = () => TodoRepo.fetchAll();
export const Add = (title) => {
  if (!title) {
    throw new Error("Empty Title feild.");
  }
  return TodoRepo.create(title);
};
export const Fetch = async (id) => {
  InvalidIDErrorCheck(id);
  const todo = await TodoRepo.fetchById(id);
  TodoNotFoundError(todo);
  return todo;
};
export const Delete = async (id) => {
  InvalidIDErrorCheck(id);
  const todo = await TodoRepo.deleteById(id);
  TodoNotFoundError(todo);
  return todo;
};
export const ToggleComplete = async (id) => {
  InvalidIDErrorCheck(id);
  const todo = await TodoRepo.toggleCompleteById(id);
  TodoNotFoundError(todo);
  return todo;
};
