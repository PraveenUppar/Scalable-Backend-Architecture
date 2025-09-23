import mongoose, { Model, Document, Types } from "mongoose";
import bycrypt from "bcryptjs";

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

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

const userSchema = new mongoose.Schema<UserDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bycrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});

// const User = mongoose.model("User", userSchema);

const User: Model<UserDoc> = mongoose.model<UserDoc, UserModel>(
  DOCUMENT_NAME,
  userSchema,
  COLLECTION_NAME
);

export default User;
