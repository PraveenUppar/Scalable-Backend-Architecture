import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import type { Response, NextFunction } from "express";
import type { ProtectedRequest } from "../../types/app-request.js";

const authMiddleware = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};
export default authMiddleware;
