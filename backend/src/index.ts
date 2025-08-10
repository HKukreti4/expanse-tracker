import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use(errorMiddleware);
app.listen(process.env.PORT || 5000, () => {
  console.log("server connected ", process.env.PORT);
});
