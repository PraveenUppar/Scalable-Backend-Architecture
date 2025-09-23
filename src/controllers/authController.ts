import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import type { Response } from "express";
import type { ProtectedRequest } from "../../types/app-request.js";
import type { UserDoc } from "../models/userModel.ts";

const registerUser = async (req: ProtectedRequest, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already Exists" });
  }
  const user = (await User.create({ name, email, password })) as UserDoc;
  if (user) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
};

const loginUser = async (req: ProtectedRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id.toString());
    res.status(200).json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error(" Invalid email or password");
  }
};

const logoutUser = (req: ProtectedRequest, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
