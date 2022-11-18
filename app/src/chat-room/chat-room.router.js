import { Router } from "express";

import {
  getAllRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "./chat-room.controller";

const router = Router();

// /api/chat

router.route("/").get(getAllRooms).post(createRoom);

router.route("/:id").get(getRoom).put(updateRoom).delete(deleteRoom);

export default router;
