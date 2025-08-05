// controllers/category.controller.ts
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import errorHandler from "../utils/errorHandler";
import { Category } from "../models/categoryModel";

export interface customReq extends Request {
  user: {
    _id: string;
    email: string;
    role: "admin" | "user";
  };
}
//    Create a new category
export const createCategory = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { name, icon } = req.body;
    let user_id: null | string; // Assumes user is set via auth middleware
    if (req.user.role === "admin") {
      user_id = null;
    } else {
      user_id = req.user._id;
    }

    if (!name) {
      next(new errorHandler("Category name is required", 400));
    }

    const existing = await Category.findOne({
      name,
      $or: [
        { user_id: null }, // global
        { userId: user_id },
      ],
    });
    if (existing) {
      return next(new errorHandler("Category already exists", 409));
    }

    const category = await Category.create({ name, icon, user_id });
    res.status(201).json(category);
  }
);

//    Get all categories for user
export const getCategories = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const user_id = req.user._id;
    const categories = await Category.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(categories);
  }
);

//     Update category
export const updateCategory = asyncHandler(
  async (req: customReq, res: Response) => {
    const { id } = req.params;
    const { name, icon } = req.body;
    const user_id = req.user._id;

    const category = await Category.findOne({ _id: id, user_id });
    if (!category) {
      throw new errorHandler("Category not found", 404);
    }

    category.name = name || category.name;
    category.icon = icon || category.icon;
    await category.save();

    res.status(200).json(category);
  }
);

// @desc    Delete category
export const deleteCategory = asyncHandler(
  async (req: customReq, res: Response) => {
    const { id } = req.params;
    const user_id = req.user._id;

    const category = await Category.findOneAndDelete({ _id: id, user_id });
    if (!category) {
      throw new errorHandler("Category not found or already deleted", 404);
    }

    res.status(200).json({ message: "Category deleted successfully" });
  }
);
