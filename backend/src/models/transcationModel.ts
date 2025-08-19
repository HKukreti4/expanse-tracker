// models/Transaction.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  type: "income" | "expanse";
  amount: number;
  category: Types.ObjectId;
  date: Date;
  note: string;
  userId: Types.ObjectId;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: { type: String, enum: ["income", "expanse"], required: true },
    amount: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    date: { type: Date, required: true },
    note: {
      type: String,
      default: "Added new transaction",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TransactionSchema.pre("save", function () {
  if (!this.date) {
    const now = new Date();
    const isOffSet = 5.5 * 60 * 60 * 1000;
    const isDate = new Date(now.getTime() + isOffSet);
    this.date = isDate;
  }
});

export const Transaction = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
