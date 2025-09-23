import mongoose, { Model, Document, Types } from "mongoose";
export interface UserDoc extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}
export interface UserModel extends mongoose.Model<UserDoc> {
    matchPassword(enteredPassword: string): Promise<boolean>;
}
export declare const DOCUMENT_NAME = "User";
export declare const COLLECTION_NAME = "users";
declare const User: Model<UserDoc>;
export default User;
//# sourceMappingURL=userModel.d.ts.map