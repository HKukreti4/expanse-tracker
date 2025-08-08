import bcrypt from "bcryptjs";
import { NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";

type roleType = "admin" | "user";
type subscriptionType = null | "standard" | "enterprise";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  contact?: string;
  role?: roleType;
  isVerified?: boolean;
  subscription?: subscriptionType;
}
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
    contact: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPass: string = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  next();
});

export const User = mongoose.model("User", UserSchema);
