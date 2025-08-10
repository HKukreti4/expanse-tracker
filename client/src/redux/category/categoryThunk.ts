import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { IconOption } from "../../components/forms/Iconlist";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

export interface categoryResponse {
  category_name: string;
  _id: string;
  icon: string;
  userId?: string;
}
export const fetchCategories = createAsyncThunk<
  categoryResponse[], // Return type if fulfilled
  void, // Argument type (void means no args)
  { rejectValue: string } // Rejected type
>("category/fetchCategories", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;
    const response = await axiosInstance.get("/category/all", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return response.data.category as categoryResponse[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      return rejectWithValue(msg || "Failed to fetch categories");
    }
    return rejectWithValue("Failed to fetch categories");
  }
});
type categoryId = string;

export const deleteCategory = createAsyncThunk<
  categoryId, // Return type if fulfilled
  categoryId, // Argument type (void means no args)
  { rejectValue: string } // Rejected type
>(
  "category/deleteCategory",
  async (id: categoryId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state?.auth?.user?.token;
      const response = await axiosInstance.delete(`/category/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (!response.data.category) {
        return rejectWithValue("Category not found or already deleted");
      }
      toast.success("Successfully deleted category");
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error?.response?.data?.message;
        toast.error("Failed to delete category");
        return rejectWithValue(msg || "Failed to delete category");
      }
      toast.error("Failed to delete category");
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

export const updateCategory = createAsyncThunk<
  categoryResponse, // ✅ Return type: updated category object
  { id: string; data: Partial<categoryResponse> }, // ✅ Argument type
  { rejectValue: string }
>(
  "category/updateCategory",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state?.auth?.user?.token;

      const response = await axiosInstance.put(`/category/${id}`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.data.category) {
        return rejectWithValue("Category not found");
      }

      toast.success("Category updated successfully");
      return response.data.category as categoryResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error?.response?.data?.message;
        toast.error("Failed to update category");
        return rejectWithValue(msg || "Failed to update category");
      }
      toast.error("Failed to update category");
      return rejectWithValue("Failed to update category");
    }
  }
);
