import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorHandler";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/userModel";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
  token?: string;
}

const verifyToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      // Throw error using your custom error handler
      return next(new errorHandler("JWT secret not defined", 500));
    }

    try {
      const decoded = jwt.verify(token, secret) as {
        id: string;
        email: string;
        iat?: number;
        exp?: number;
      };

      const userId = decoded.id;
      const user = await User.find({ _id: userId });
      if (!user) {
        next(new errorHandler("user not exist", 401));
      }
      req.user = user[0];
      req.token = token;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
);

export default verifyToken;
