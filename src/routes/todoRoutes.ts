import express, { Router } from "express";
import {
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router: Router = express.Router();

router.get("/", authMiddleware, getTodo);
router.post("/", authMiddleware, createTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.put("/:id", authMiddleware, editTodo);

export default router;
