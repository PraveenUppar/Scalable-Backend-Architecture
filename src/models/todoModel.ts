import mongoose, { Model } from "mongoose";

export interface TodoDoc extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  completed: boolean;
}

export const DOCUMENT_NAME = "Todo";
export const COLLECTION_NAME = "todos";

const todoSchema = new mongoose.Schema<TodoDoc>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// const Todo = mongoose.model("Todo", todoSchema);

const Todo: Model<TodoDoc> = mongoose.model<TodoDoc>(
  DOCUMENT_NAME,
  todoSchema,
  COLLECTION_NAME
);

export default Todo;
