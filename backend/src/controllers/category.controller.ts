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
//   Create a new category
export const createCategory = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { category_name, icon } = req.body;
    let user_id: null | string; // Assumes user is set via auth middleware
    if (req.user.role === "admin") {
      user_id = null;
    } else {
      user_id = req.user?._id;
    }

    if (!category_name) {
      next(new errorHandler("Category name is required", 400));
    }

    const existing = await Category.findOne({
      category_name,
      $or: [{ user_id: null }, { userId: user_id }],
    });
    if (existing) {
      return next(new errorHandler("Category already exists", 409));
    }
    const category = await Category.create({
      category_name,
      icon,
      userId: user_id,
    });
    res.status(201).json({
      success: true,
      category,
      message: "Successfully created Category",
    });
  }
);

//    Get all categories for user
export const getCategories = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const user_id = req.user._id;

    const role = req.user.role;

    const categories = await Category.find({
      $or: [{ userId: null }, { userId: user_id }],
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      category: categories,
      message: "Successfully get categories",
    });
  }
);
export const getCategoriesById = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const category = await Category.findById({
      id,
    });
    res.status(200).json({
      success: true,
      category: category,
      message: "Successfully get category",
    });
  }
);

//     Update category
export const updateCategory = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { category_name, icon } = req.body;
    const user_id = req.user._id;

    const category = await Category.findOne({ _id: id });
    if (!category) {
      return next(new errorHandler("Category not found", 404));
    }

    category.category_name = category_name || category.category_name;
    category.icon = icon || category.icon;

    await category.save();

    res.status(200).json({
      success: true,
      category: category,
      message: "Successfully get categories",
    });
  }
);

// @desc    Delete category
export const deleteCategory = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user_id = req.user._id;
    const role = req.user.role;
    if (!id) {
      return next(new errorHandler("id is invalid", 401));
    }
    let category;
    if (role == "admin") {
      category = await Category.findOneAndDelete({
        _id: id,
      });
    } else {
      category = await Category.findOneAndDelete({
        $and: [{ _id: id }, { userId: user_id }],
      });
    }
    if (!category) {
      return next(
        new errorHandler("Category not found or already deleted", 404)
      );
    }
    res
      .status(200)
      .json({ message: "Category deleted successfully", category: category });
  }
);
