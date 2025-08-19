import express from "express";

import verifyToken from "../middlewares/tokenVerify";
import {
  getCategorywiseTransactions,
  getMonthlyReport,
  getRecentTransactions,
  getRecentTransactionsCategoryWise,
  getTotals,
} from "../controllers/reports.controller";

const reportRoutes = express.Router();

reportRoutes.get("/monthly-record", verifyToken, getMonthlyReport);
reportRoutes.get("/get-balance", verifyToken, getTotals);
reportRoutes.get("/recents", verifyToken, getRecentTransactions);
reportRoutes.get("/category-wise", verifyToken, getCategorywiseTransactions);
reportRoutes.get(
  "/category-wise/:type",
  verifyToken,
  getRecentTransactionsCategoryWise
);

export default reportRoutes;
