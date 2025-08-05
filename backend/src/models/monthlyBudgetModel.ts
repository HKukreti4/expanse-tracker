// models/MonthlyBudget.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IMonthlyBudget extends Document {
  total_amount: number;
  category: string;
  date: Date;
  userId: Types.ObjectId;
}

const MonthlyBudgetSchema = new Schema<IMonthlyBudget>(
  {
    total_amount: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const MonthlyBudget = model<IMonthlyBudget>(
  "MonthlyBudget",
  MonthlyBudgetSchema
);
