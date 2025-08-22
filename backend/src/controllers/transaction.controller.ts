import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import errorHandler from "../utils/errorHandler";

import { Category } from "../models/categoryModel";
import mongoose, { Types } from "mongoose";
import { Transaction } from "../models/transcationModel";
import { customReq } from "./category.controller";

//  Create a new transaction (income or expense )
export const createTransaction = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { type, amount, category, date, note } = req.body;
    const userId = req.user._id;
    if (!["income", "expense"].includes(type)) {
      next(new errorHandler("Invalid transaction type", 400));
    }

    if (!amount || isNaN(amount)) {
      next(new errorHandler("Amount is required and must be a number", 400));
    }

    const isValidCategory = await Category.findOne({
      _id: category,
      $or: [{ user_id: null }, { user_id: userId }],
    });

    if (!isValidCategory) {
      next(new errorHandler("Invalid or unauthorized category", 403));
    }

    const transaction = await Transaction.create({
      type,
      amount,
      category: new mongoose.Types.ObjectId(category),
      date,
      userId,
      note,
    });
    let fetchTransaction = await Transaction.findOne({
      _id: transaction._id,
    }).populate("category", "category_name icon");
    if (!fetchTransaction) {
      return next(
        new errorHandler("Transaction not found after creation", 403)
      );
    }

    let transactionObj = fetchTransaction?.toObject();
    (transactionObj as any).date = new Date(
      transactionObj.date
    ).toLocaleDateString("en-in");

    res.status(201).json({
      success: true,
      message: "Succesfully added the transaction",
      result: transactionObj,
    });
  }
);

// @desc    Get all transactions for the logged-in user
export const getIncomeTransactions = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    let page = Number(req.query.page) || 1;

    let limitPerPage = Number(req.params.limit) || 10;
    let skip = (page - 1) * limitPerPage;

    const [result] = await Transaction.aggregate([
      {
        $match: { userId: userId, type: "income" },
      },
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "categories", // ✅ collection name
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
              },
            },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: limitPerPage },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const transactions = result?.data || [];
    const total = result?.totalCount[0]?.count || 0;

    // format dates
    const formatted = transactions.map((t: any) => ({
      ...t,
      date: new Date(t.date).toLocaleDateString("en-IN"),
    }));

    res.status(200).json({
      success: true,
      message: "Successfully fetched transactions",
      result: formatted,
      pagination: {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limitPerPage),
      },
    });
  }
);

export const getExpanseTransactions = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    let page = Number(req.query.page) || 1;
    let limitPerPage = Number(req.params.limit) || 10;
    let skip = (page - 1) * limitPerPage;

    const [result] = await Transaction.aggregate([
      {
        $match: { userId: userId, type: "expense" },
      },
      {
        $facet: {
          data: [
            {
              $lookup: {
                from: "categories", // ✅ collection name
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
              },
            },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: limitPerPage },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const transactions = result?.data || [];
    const total = result?.totalCount[0]?.count || 0;

    // format dates
    const formatted = transactions.map((t: any) => ({
      ...t,
      date: new Date(t.date).toLocaleDateString("en-IN"),
    }));

    res.status(200).json({
      success: true,
      message: "Successfully fetched transactions",
      result: formatted,
      pagination: {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limitPerPage),
      },
    });
  }
);

// @desc    Update a transaction by ID
export const updateTransaction = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user._id;
    const { type, amount, category, date, note } = req.body;

    const transaction = await Transaction.findOne({ _id: id, userId: userId });

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
    transaction.note = note ? note : transaction.note;

    await transaction.save();
    res.status(201).json({
      success: true,
      message: "Succesfully updated the transaction",
      result: transaction,
    });
  }
);
export const deleteTransaction = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user._id;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!transaction) {
      return next(
        new errorHandler("Transaction not found or already deleted", 404)
      );
    }

    res.status(201).json({
      success: true,
      message: "Succesfully deleted the transaction",
      result: transaction._id,
    });
  }
);
