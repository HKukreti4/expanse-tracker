import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import errorHandler from "../utils/errorHandler";

import { Category } from "../models/categoryModel";
import { Types } from "mongoose";
import { Transaction } from "../models/transcationModel";
import { customReq } from "./category.controller";

//  Create a new transaction (income or expanse)
export const createTransaction = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { type, amount, category, date } = req.body;
    const userId = req.user._id;

    if (!["income", "expanse"].includes(type)) {
      next(new errorHandler("Invalid transaction type", 400));
    }

    if (!amount || isNaN(amount)) {
      next(new errorHandler("Amount is required and must be a number", 400));
    }

    const isValidCategory = await Category.findOne({
      _id: category,
      $or: [
        { user_id: null }, // global
        { user_id: userId }, // user's own
      ],
    });

    if (!isValidCategory) {
      next(new errorHandler("Invalid or unauthorized category", 403));
    }

    const transaction = await Transaction.create({
      type,
      amount,
      category: new Types.ObjectId(category),
      date: new Date(date),
      userId,
    });

    res.status(201).json(transaction);
  }
);

// @desc    Get all transactions for the logged-in user
export const getTransactions = asyncHandler(
  async (req: customReq, res: Response) => {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId })
      .populate("category", "name icon") // optional: populating category info
      .sort({ date: -1 });

    res.json(transactions);
  }
);

// @desc    Update a transaction by ID
export const updateTransaction = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { type, amount, category, date } = req.body;

    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return next(new errorHandler("Transaction not found", 404));
    }

    if (category) {
      const validCategory = await Category.findOne({
        _id: category,
        $or: [{ user_id: null }, { user_id: userId }],
      });

      if (!validCategory) {
        return next(new errorHandler("Invalid category", 403));
      }

      transaction.category = category;
    }

    transaction.type = type ?? transaction.type;
    transaction.amount = amount ?? transaction.amount;
    transaction.date = date ? new Date(date) : transaction.date;

    await transaction.save();
    res.json(transaction);
  }
);
