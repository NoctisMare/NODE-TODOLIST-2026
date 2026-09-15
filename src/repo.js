import TodoList, { STATUS } from "./model.js";

export const fetchAll = () => TodoList.find();
export const create = (title) =>
  TodoList.create({
    title,
  });
export const fetchById = (id) => TodoList.findById(id);
export const deleteById = (id) => TodoList.findByIdAndDelete(id);
export const toggleCompleteById = (id) =>
  TodoList.findByIdAndUpdate(id, {
    $set: {
      status: STATUS.COMPLETED,
    },
  });
