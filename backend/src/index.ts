import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/reports.routes";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const staticPath = path.join(__dirname, "public/avatars/");
console.log(staticPath);
connectDb();
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
  console.log("server connected ", process.env.PORT);
});
