import { Request } from "express";
import ApiKeyDoc from "../models/ApiKeyModel";
import KeyStoreDoc from "../models/KeyStoreModel";
import { UserDoc } from "../models/userModel";
import { RoleCode } from "../models/roleModel";

declare interface PublicRequest extends Request {
  apiKey?: ApiKeyDoc;
}

declare interface ProtectedRequest extends Request {
  user: UserDoc;
  accessToken: string;
  keystore: KeyStoreDoc;
}

declare interface RoleRequest extends ProtectedRequest {
  currentRoleCodes: string[];
}
