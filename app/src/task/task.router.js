import { Router } from "express";
import {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
} from "./task.controller.js";

const taskRouter = Router();

// api/task/
//get all tasks

taskRouter.route("/").get(getAllTasks).post(createTask);

//api/task/:id
// get task / update task / delete task

taskRouter.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default taskRouter;
