import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/userModel";
import { checkPass } from "../utils/passwordCompare";
import errorHandler from "../utils/errorHandler";
import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new errorHandler("Email or password does not exist", 404));
    }

    const result = await checkPass(password, user.password);
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
    const expiry = (process.env.JWT_EXPIRY as StringValue) ?? "1d";
    const options: SignOptions = {
      expiresIn: expiry,
    };

    const token = jwt.sign(payload, secret, options);

    res.status(200).json({
      message: "Successful login",
      user: { id: user._id, email: user.email, name: user.name },
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

    const payload = {
      id: newuser._id,
      email: newuser.email,
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
    const expiry = (process.env.JWT_EXPIRY as StringValue) ?? "1d";
    const options: SignOptions = {
      expiresIn: expiry,
    };

    const token = jwt.sign(payload, secret, options);

    res.status(200).send({
      message: "Succesfully created the user",
      user: { name: newuser.name, email: newuser.email, id: newuser._id },
      token: token,
    });
  }
);

interface customReq extends Request {
  user: {
    email: string;
    _id: string;
    role: "admin" | "user";
  };
  token: string;
}
export const verifyUser = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { email } = req.user;
    const id = req.user._id;
    let token = req.token;
    const user = await User.findOne({ $or: [{ email: email }, { _id: id }] });
    if (!user) {
      return next(new errorHandler("Email or password does not exist", 404));
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    if (!token) {
      const secret = process.env.SECRET_KEY || "1d";
      if (!secret) {
        next(
          new errorHandler(
            "SECRET_KEY is not defined in environment variables",
            404
          )
        );
      }
      const expiry = (process.env.JWT_EXPIRY as StringValue) ?? "1d";
      const options: SignOptions = {
        expiresIn: expiry,
      };

      token = jwt.sign(payload, secret, options);
    }

    res.status(200).json({
      message: "Successful login",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  }
);

export const updateUser = asyncHandler(
  async (req: customReq, res: Response): Promise<void> => {
    const userId = req.user._id;
    const { name, contact } = req.body;

    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (contact) updateData.contact = contact;

    if (req.file) {
      const avatarUrl = `${req.protocol}://${req.get("host")}/public/avatars/${
        req.file.filename
      }`;
      updateData.avatar = avatarUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
      },
      token: req.token,
    });
  }
);
