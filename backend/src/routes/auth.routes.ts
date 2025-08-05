import express from "express";
import { loginUser, registeruser } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/register", registeruser);
authRoutes.post("/login", loginUser);

export default authRoutes;
