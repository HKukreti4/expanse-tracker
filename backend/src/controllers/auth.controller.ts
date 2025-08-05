import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/userModel";
import { checkPass } from "../utils/passwordCompare";
import errorHandler from "../utils/errorHandler";
import jwt, { SignOptions } from "jsonwebtoken";

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new errorHandler("Email or password does not exist", 404));
    }

    const result = checkPass(password, user.password);
    if (!result) {
      return next(new errorHandler("User or password is incorrect", 401));
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const secret = process.env.SECRET_KEY || "1d";
    if (!secret) {
      next(
        new errorHandler(
          "SECRET_KEY is not defined in environment variables",
          404
        )
      );
    }
    const expiry = process.env.JWT_EXPIRY ?? "1d";
    const options: SignOptions = {
      expiresIn: expiry,
    };

    const token = jwt.sign(payload, secret, options);

    res.status(200).json({
      message: "Successful login",
      user: { id: user._id, email: user.email },
      token,
    });
  }
);

export const registeruser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, avatar, role, contact, isVerified } =
      req.body;
    if (!name || !password || !email) {
      return next(new errorHandler("All fields are required", 404));
    }
    const checkExistinguser = await User.findOne({ email: email });
    if (checkExistinguser) {
      return next(
        new errorHandler("User already exist. Login to continue", 404)
      );
    }
    const newUser = {
      name,
      email,
      avatar,
      password,
      role,
      contact,
      isVerified,
    };
    const user = new User(newUser);
    const newuser = await user.save();
    if (!newuser) {
      return next(new errorHandler("Failed to create the new user", 401));
    }
    res
      .status(200)
      .send({ message: "Succesfully created the user", user: newuser });
  }
);
