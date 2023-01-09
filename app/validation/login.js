import Validator from "validator";
import isEmpty from "./isEmpty.js";

import { User } from "../src/user/user.model.js";

export const validateLoginInput = async (data) => {
  let errors = {};

  data.loginId = !isEmpty(data.loginId) ? data.loginId : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  const existUser = await User.findOne({ loginId: data.loginId }).exec();

  if (!existUser) {
    errors.loginId = "You have to register first in order to signin!";
  } else {
    const match = await existUser.checkPassword(data.password);
    if (!match) {
      errors.password = "incorrect password!";
    }
  }

  if (Validator.isEmpty(data.loginId)) {
    errors.loginId = "loginId field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
