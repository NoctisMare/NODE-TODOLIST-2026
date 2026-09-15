import * as TodoListController from "./controller.js";
import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(TodoListController.FetchAllRequestHandler)
  .post(TodoListController.CreateRequestHandler);

router
  .route("/:id")
  .get(TodoListController.FetchRequestHandler)
  .patch(TodoListController.UpdateRequestHandler)
  .delete(TodoListController.DeleteRequestHandler);

export default router;
