import Todo from "../models/todoModel.js";
import type { ProtectedRequest } from "../../types/app-request.js";
import type { Response } from "express";

const getTodo = async (req: ProtectedRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

const createTodo = async (req: ProtectedRequest, res: Response) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: req.user._id,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

const editTodo = async (req: ProtectedRequest, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error editing todo" });
  }
};

const deleteTodo = async (req: ProtectedRequest, res: Response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

export { getTodo, createTodo, editTodo, deleteTodo };
