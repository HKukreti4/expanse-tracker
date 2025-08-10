import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  category_name: string;
  userId: string | null;
  icon: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    category_name: { type: String, required: true, lowercase: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    icon: { type: String },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
