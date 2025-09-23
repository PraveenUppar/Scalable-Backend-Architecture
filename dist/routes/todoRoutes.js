import express, { Router } from "express";
import { getTodo, createTodo, editTodo, deleteTodo, } from "../controllers/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the todo
 *         status:
 *           type: boolean
 *           default: false
 *           description: Status of the todo
 */
/**
 * @swagger
 * /api/todo:
 *   get:
 *     tags:
 *       - todos
 *     summary: Get all todos for authenticated user
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Not authenticated
 */
router.get("/", authMiddleware, getTodo);
/**
 * @swagger
 * /api/todo:
 *   post:
 *     tags:
 *       - todos
 *     summary: Create a new todo
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Not authenticated
 *       400:
 *         description: Invalid input data
 */
router.post("/", authMiddleware, createTodo);
/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     tags:
 *       - todos
 *     summary: Delete a todo
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Todo not found
 */
router.delete("/:id", authMiddleware, deleteTodo);
/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     tags:
 *       - todos
 *     summary: Update a todo
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Todo not found
 */
router.put("/:id", authMiddleware, editTodo);
export default router;
//# sourceMappingURL=todoRoutes.js.map