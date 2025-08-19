import { createAsyncThunk } from "@reduxjs/toolkit";
import type { monthlyreportType } from "./reportSlice";
import type { RootState } from "../store/store";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

type returnMonthType = {
  record: monthlyreportType[];
  type: string;
};
export const fetchMonthlyReport = createAsyncThunk<
  returnMonthType, // Return type if fulfilled
  { type: string }, // Argument type (void means no args)
  { rejectValue: string } // Rejected type
>("report/monthly-income", async ({ type }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const token = state?.auth?.user?.token;
    const selectedMonth = state?.report.selectedMonth;
    const response = await axiosInstance.get(`/reports/monthly-record`, {
      params: { month: selectedMonth, type },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { record: response.data.result, type: type };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error?.response?.data?.message;
      return rejectWithValue(msg || "Failed to fetch categories");
    }
    return rejectWithValue("Failed to fetch categories");
  }
});
