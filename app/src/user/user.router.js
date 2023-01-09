import { Router } from "express";

import {
  me,
  getUser,
  getAllTechnicals,
  updateUser,
  deleteUser,
  getTechnicalsByCategory,
  changePassword,
} from "./user.controller.js";

const userRouter = Router();

//api/user/technicals
userRouter.get("/technicals", getAllTechnicals);

// api/user/category /:name

//router.get('/category/:name' ,getTechnicalsByCategory )

//api/user/changePassword
userRouter.route("/changepassword").put(changePassword);

//api/user/me

userRouter.get("/me", me);

// api/user/:id

userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
