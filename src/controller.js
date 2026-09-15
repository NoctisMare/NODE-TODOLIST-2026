import * as TodoListService from "./service.js";

export const CreateRequestHandler = async (req, res, next) => {
  try {
    const { title } = req.body || {};
    const createdTodo = await TodoListService.Add(title);
    return res.status(200).json({
      message: "Todo was added Successfully.",
      todo: createdTodo.toObject(),
    });
  } catch (error) {
    return next(error);
  }
};

export const FetchAllRequestHandler = async (req, res, next) => {
  try {
    const todos = await TodoListService.FetchAll();
    return res.status(200).json({
      message: "Todos fetched Successfully.",
      todos: todos || [],
    });
  } catch (error) {
    return next(error);
  }
};

export const FetchRequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const todo = await TodoListService.Fetch(id);
    return res.status(200).json({
      message: "Todo Fetched Successfully.",
      todo,
    });
  } catch (error) {
    return next(error);
  }
};

export const UpdateRequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await TodoListService.ToggleComplete(id);
    return res.status(200).json({
      message: "Todo Updated Successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

export const DeleteRequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await TodoListService.Delete(id);
    return res.status(200).json({
      message: "Todo Deleted Successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
