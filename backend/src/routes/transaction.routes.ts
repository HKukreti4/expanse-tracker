import express from "express";

import verifyToken from "../middlewares/tokenVerify";
import {
  createTransaction,
  deleteTransaction,
  getExpanseTransactions,
  getIncomeTransactions,
  updateTransaction,
} from "../controllers/transaction.controller";

const transactionRoutes = express.Router();

transactionRoutes.post("/create", verifyToken, createTransaction);
transactionRoutes.get("/income", verifyToken, getIncomeTransactions);
transactionRoutes.get("/expense", verifyToken, getExpanseTransactions);
transactionRoutes.put("/:id", verifyToken, updateTransaction);
transactionRoutes.delete("/:id", verifyToken, deleteTransaction);

export default transactionRoutes;
