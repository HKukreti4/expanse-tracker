import express from "express";
import {
  loginUser,
  registeruser,
  updateUser,
  verifyUser,
} from "../controllers/auth.controller";
import verifyToken from "../middlewares/tokenVerify";
import { upload } from "../utils/multerStorage";

const authRoutes = express.Router();

authRoutes.post("/register", registeruser);
authRoutes.post("/login", loginUser);
authRoutes.get("/user", verifyToken, verifyUser);
authRoutes.put(
  "/user/update",
  verifyToken,
  upload.single("avatar"),
  updateUser
);

export default authRoutes;
