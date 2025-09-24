import type { ProtectedRequest } from "../../types/app-request.js";
import type { Response } from "express";
declare const getTodo: (req: ProtectedRequest, res: Response) => Promise<void>;
declare const createTodo: (req: ProtectedRequest, res: Response) => Promise<void>;
declare const editTodo: (req: ProtectedRequest, res: Response) => Promise<void>;
declare const deleteTodo: (req: ProtectedRequest, res: Response) => Promise<void>;
export { getTodo, createTodo, editTodo, deleteTodo };
//# sourceMappingURL=todoController.d.ts.map