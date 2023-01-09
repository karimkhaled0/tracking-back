import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryUsers,
} from "./category.controller.js";

const categoryRouter = Router();

//api/category
// get getall
//post create

categoryRouter.route("/").get(getAllCategories).post(createCategory);

// api/category/users/:id

categoryRouter.route("/users/:id").get(getCategoryUsers);

//get one
//put updateone
//delete  deleteOne

categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
