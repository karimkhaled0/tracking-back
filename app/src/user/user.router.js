import { Router } from "express";

import { me, getUser } from "./user.controller";

const router = Router();

//api/user/me

router.get("/me", me);

// api/user/:id

router.route("/:id").get(getUser);

export default router;
