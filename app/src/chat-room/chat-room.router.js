import { Router } from "express";

import {
  getAllRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "./chat-room.controller.js";

const roomRouter = Router();

// /api/chat

roomRouter.route("/").get(getAllRooms).post(createRoom);

roomRouter.route("/:id").get(getRoom).put(updateRoom).delete(deleteRoom);

export default roomRouter;
