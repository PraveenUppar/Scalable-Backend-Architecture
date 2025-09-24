import type { Response } from "express";
import type { ProtectedRequest } from "../../types/app-request.js";
declare const registerUser: (req: ProtectedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const loginUser: (req: ProtectedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const logoutUser: (req: ProtectedRequest, res: Response) => void;
export { registerUser, loginUser, logoutUser };
//# sourceMappingURL=authController.d.ts.map