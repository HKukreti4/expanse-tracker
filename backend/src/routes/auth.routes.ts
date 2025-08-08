import express from "express";
import {
  loginUser,
  registeruser,
  verifyUser,
} from "../controllers/auth.controller";
import verifyToken from "../middlewares/tokenVerify";

const authRoutes = express.Router();

authRoutes.post("/register", registeruser);
authRoutes.post("/login", loginUser);
authRoutes.get("/user", verifyToken, verifyUser);

export default authRoutes;
