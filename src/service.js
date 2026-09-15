import mongoose from "mongoose";
import * as TodoRepo from "./repo.js";

function InvalidIDErrorCheck(id) {
  if (!id) {
    throw new Error("Empty ID.");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Todo ID.");
  }
}

export const FetchAll = () => TodoRepo.fetchAll();
export const Add = (title) => {
  if (!title) {
    throw new Error("Empty Title feild.");
  }
  return TodoRepo.create(title);
};
export const Fetch = (id) => {
  InvalidIDErrorCheck(id);
  return TodoRepo.fetchById(id);
};
export const Delete = (id) => {
  InvalidIDErrorCheck(id);
  return TodoRepo.deleteById(id);
};
export const ToggleComplete = (id) => {
  InvalidIDErrorCheck(id);
  return TodoRepo.toggleCompleteById(id);
};
