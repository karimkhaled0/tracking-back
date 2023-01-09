import isEmpty from "./isEmpty.js";
import Validator from "validator";
import { Category } from "../src/category/category.model.js";

export const validateCategoryInput = async (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  const exist = await Category.findOne({ name: data.name }).lean().exec();

  if (exist) {
    errors.name = "Name must be unique!";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required!";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};
