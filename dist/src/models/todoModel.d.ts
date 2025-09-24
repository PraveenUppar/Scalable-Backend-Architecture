import mongoose, { Model } from "mongoose";
export interface TodoDoc extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    completed: boolean;
}
export declare const DOCUMENT_NAME = "Todo";
export declare const COLLECTION_NAME = "todos";
declare const Todo: Model<TodoDoc>;
export default Todo;
//# sourceMappingURL=todoModel.d.ts.map