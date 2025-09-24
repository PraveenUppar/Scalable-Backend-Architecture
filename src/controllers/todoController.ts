import Todo from "../models/todoModel.js";
import type { ProtectedRequest } from "../../types/app-request.js";
import type { Response } from "express";
import redis from "../redis/redis.js";

const getTodo = async (req: ProtectedRequest, res: Response) => {
  const userId = req.user._id;
  const cacheKey = `todos:${userId}`;

  try {
    const cachedTodos = await redis.get(cacheKey);

    if (cachedTodos) {
      // console.log(`CACHE HIT for user: ${userId}`);
      return res.status(200).json(JSON.parse(cachedTodos));
    }

    // console.log(`CACHE MISS for user: ${userId}. Querying database...`);
    const todos = await Todo.find({ user: userId });

    await redis.set(cacheKey, JSON.stringify(todos), "EX", 3600);

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

const createTodo = async (req: ProtectedRequest, res: Response) => {
  const userId = req.user._id;
  const cacheKey = `todos:${userId}`;

  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: userId,
    });

    // console.log(`CACHE INVALIDATED for user: ${userId}`);
    await redis.del(cacheKey);

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

const editTodo = async (req: ProtectedRequest, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const userId = req.user._id;
  const cacheKey = `todos:${userId}`;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    // console.log(`CACHE INVALIDATED for user: ${userId}`);
    await redis.del(cacheKey);

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error editing todo" });
  }
};

const deleteTodo = async (req: ProtectedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;
  const cacheKey = `todos:${userId}`;

  try {
    await Todo.findByIdAndDelete(id);

    // console.log(`CACHE INVALIDATED for user: ${userId}`);
    await redis.del(cacheKey);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

export { getTodo, createTodo, editTodo, deleteTodo };
