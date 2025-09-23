import { UserDoc, UserModel } from "../src/models/userModel.ts";
import type { Request } from "express";

declare interface ProtectedRequest extends Request {
  user?: UserDoc | any;
}
