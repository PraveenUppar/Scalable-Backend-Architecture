import type { Response, NextFunction } from "express";
import type { ProtectedRequest } from "../../types/app-request.js";
declare const authMiddleware: (req: ProtectedRequest, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map