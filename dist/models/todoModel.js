import mongoose, { Model } from "mongoose";
export const DOCUMENT_NAME = "Todo";
export const COLLECTION_NAME = "todos";
const todoSchema = new mongoose.Schema({
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
}, { timestamps: true });
// const Todo = mongoose.model("Todo", todoSchema);
const Todo = mongoose.model(DOCUMENT_NAME, todoSchema, COLLECTION_NAME);
export default Todo;
//# sourceMappingURL=todoModel.js.map