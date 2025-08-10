import express from "express";

import verifyToken from "../middlewares/tokenVerify";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
} from "../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.post("/create", verifyToken, createCategory);
categoryRoutes.get("/all", verifyToken, getCategories);
categoryRoutes.delete("/:id", verifyToken, deleteCategory);
categoryRoutes.get("/:id", verifyToken, getCategoriesById);
categoryRoutes.put("/:id", verifyToken, updateCategory);

export default categoryRoutes;
