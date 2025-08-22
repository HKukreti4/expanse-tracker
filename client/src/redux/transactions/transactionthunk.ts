import { createAsyncThunk } from "@reduxjs/toolkit";
import type { transactionDataType } from "../../components/forms/AddTransactionForm";
import type { RootState } from "../store/store";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

export interface PaginationType {
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}
export interface responseType {
  success: boolean;
  message: string;
  result: transactionDataType;
  pagination: PaginationType;
}

export const createTransaction = createAsyncThunk<
  transactionDataType, // ✅ Return type: created
  transactionDataType, // ✅ Argument type
  { rejectValue: string }
>("transaction/add", async (data, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;

    const response = await axiosInstance.post("/transaction/create", data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.data.result) {
      return rejectWithValue("Category not found");
    }
    toast.success("Transaction created successfully");
    return response.data.result as transactionDataType;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      toast.error("Failed to create transaction");
      return rejectWithValue(msg || "Failed to create transaction");
    }
    toast.error("Something went wrong");
    return rejectWithValue("Something went wrong");
  }
});

export interface responseForType {
  data: transactionDataType[];
  pagination: PaginationType;
}

export const getAllIncomeTransactions = createAsyncThunk<
  responseForType, // ✅ Return type: created
  void, // ✅ Argument type
  { rejectValue: string }
>("transaction/income", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;
    const page = state?.transactions.pagination.currentPage || 1;

    const response = await axiosInstance.get("/transaction/income", {
      params: { page: page },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.data.result) {
      return rejectWithValue("Category not found");
    }
    return { data: response.data.result, pagination: response.data.pagination };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      toast.error("Failed to get transaction");
      return rejectWithValue(msg || "Failed to get transaction");
    }
    toast.error("Something went wrong");
    return rejectWithValue("Something went wrong");
  }
});
export const getAllExpanseTransactions = createAsyncThunk<
  responseForType, // ✅ Return type: created
  void, // ✅ Argument type
  { rejectValue: string }
>("transaction/expanses", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;
    const page = state?.transactions.pagination.currentPage || 1;
    const response = await axiosInstance.get("/transaction/expense", {
      params: { page: page },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.data.result) {
      return rejectWithValue("Category not found");
    }
    return { data: response.data.result, pagination: response.data.pagination };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      toast.error("Failed to get transaction");
      return rejectWithValue(msg || "Failed to get transaction");
    }
    toast.error("Something went wrong");
    return rejectWithValue("Something went wrong");
  }
});
export const deleteTransactions = createAsyncThunk<
  string, // ✅ Return type: id
  string, // ✅ Argument type
  { rejectValue: string }
>("transaction/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;

    const response = await axiosInstance.delete(`/transaction/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.data.result) {
      return rejectWithValue("Transaction not found");
    }
    toast.success("Successfully deleted transaction");
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      toast.error("Failed to delete transaction");
      return rejectWithValue(msg || "Failed to delete transaction");
    }
    toast.error("Something went wrong");
    return rejectWithValue("Something went wrong");
  }
});
export const deleteTransactionsIncome = createAsyncThunk<
  string, // ✅ Return type: id
  string, // ✅ Argument type
  { rejectValue: string }
>("transaction/delete-income", async (id, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;

    const response = await axiosInstance.delete(`/transaction/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (!response.data.result) {
      return rejectWithValue("Transaction not found");
    }
    toast.success("Successfully deleted transaction");
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      toast.error("Failed to delete transaction");
      return rejectWithValue(msg || "Failed to delete transaction");
    }
    toast.error("Something went wrong");
    return rejectWithValue("Something went wrong");
  }
});
