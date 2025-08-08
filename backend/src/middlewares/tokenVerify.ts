import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorHandler";
import asyncHandler from "../utils/asyncHandler";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
  token?: string;
}

const verifyToken = asyncHandler(
  (req: AuthRequest, res: Response, next: NextFunction) => {
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
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      req.token = token;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
);

export default verifyToken;
