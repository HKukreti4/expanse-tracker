import { Transaction } from "../models/transcationModel";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import errorHandler from "../utils/errorHandler";
import { customReq } from "./category.controller";

interface GetQueryMonth {
  month?: string;
  type?: "expanse" | "income";
}
interface customreqWithparams extends Request<{}, {}, {}, GetQueryMonth> {
  user: {
    _id: string;
    email: string;
    role: "admin" | "user";
  };
}

export const getMonthlyReport = asyncHandler(
  async (req: customreqWithparams, res: Response, next: NextFunction) => {
    const month = req.query.month
      ? parseInt(req.query.month)
      : new Date().getMonth() + 1;
    const type = req.query.type;
    const validType = ["income", "expanse"];
    if (!type) {
      return next(new errorHandler("Type is required", 401));
    }
    const checkValidType = validType.includes(type);
    if (!checkValidType) {
      return next(new errorHandler("Type is not valid", 401));
    }
    const result = await Transaction.aggregate([
      {
        $match: {
          type: type,
          userId: req.user?._id,
          $expr: {
            $eq: [{ $month: "$date" }, month], // ✅ filter by month
          },
        },
      },
      {
        $group: {
          _id: "$date",
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }, // ✅ sort by date first
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$_id",
            },
          },
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result,
      message: "Successfully fetched the records",
    });
  }
);

export const getTotals = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user?._id,
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id", "income"] }, "$total", 0],
            },
          },
          expanse: {
            $sum: {
              $cond: [{ $eq: ["$_id", "expanse"] }, "$total", 0],
            },
          },
        },
      },

      {
        $addFields: {
          balance: { $subtract: ["$income", "$expanse"] },
        },
      },
      {
        $project: {
          _id: 0,
          income: 1,
          expanse: 1,
          balance: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result,
      message: "Successfully fetched the records",
    });
  }
);

export const getRecentTransactions = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user?._id,
        },
      },
      {
        $lookup: {
          from: "categories", // ✅ actual collection name
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true, // if some tx doesn't have category
        },
      },
      {
        $project: {
          category: 1,
          type: 1,
          amount: 1,
          icon: 1,
          date: 1,
        },
      },
      {
        $sort: { date: -1 }, // optional: latest first
      },
      {
        $limit: 6,
      },
    ]);

    res.status(200).json({
      success: true,
      result,
      message: "Successfully fetched the records",
    });
  }
);
export const getCategorywiseTransactions = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user?._id,
        },
      },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true, // if some tx doesn't have category
        },
      },
    ]);
    res.status(200).json({
      success: true,
      result,
      message: "Successfully fetched the records",
    });
  }
);

export const getRecentTransactionsCategoryWise = asyncHandler(
  async (req: customReq, res: Response, next: NextFunction) => {
    const typearr = ["income", "expanse"];
    const type = req.params.type;
    if (!typearr.includes(type)) next(new errorHandler("Type is wrong", 401));
    const limit = Number(req.query.limit) || 6;
    const skip = Number(req.query.skip) || 0;
    if (!type) next(new errorHandler("Type is required", 401));
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user?._id,
          type: type,
        },
      },
      {
        $lookup: {
          from: "categories", // ✅ actual collection name
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true, // if some tx doesn't have category
        },
      },
      {
        $project: {
          category: 1,
          type: 1,
          amount: 1,
          icon: 1,
          date: 1,
        },
      },
      {
        $sort: { date: -1 }, // optional: latest first
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      success: true,
      result,
      message: "Successfully fetched the records",
    });
  }
);
