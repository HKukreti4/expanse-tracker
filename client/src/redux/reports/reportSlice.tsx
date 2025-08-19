import { createSlice } from "@reduxjs/toolkit";
import type { transactionDataType } from "../../components/forms/AddTransactionForm";
import { fetchMonthlyReport } from "./reportThunk";

export interface monthlyreportType {
  totalAmount: number;
  date: string;
}

interface initialstateType {
  loading: boolean;
  error: string | null;
  selectedMonth: number;
  monthlyExpenseReport: monthlyreportType[];
  monthlyIncomeReport: monthlyreportType[];
  weeklyIncomeReport: transactionDataType[];
  weeklyExpenseReport: transactionDataType[];
  recentIncomeTransactions: transactionDataType[];
  recentExpenseTransactions: transactionDataType[];
}
const initialState: initialstateType = {
  loading: false,
  error: null,
  selectedMonth: new Date().getMonth() + 1,
  monthlyExpenseReport: [],
  monthlyIncomeReport: [],
  weeklyIncomeReport: [],
  weeklyExpenseReport: [],
  recentIncomeTransactions: [],
  recentExpenseTransactions: [],
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.type == "income"
          ? (state.monthlyIncomeReport = action.payload.record)
          : (state.monthlyExpenseReport = action.payload.record);
      })
      .addCase(fetchMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSelectedMonth } = reportSlice.actions;
export default reportSlice.reducer;
