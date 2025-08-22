// transactionSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { transactionDataType } from "../../components/forms/AddTransactionForm";
import {
  createTransaction,
  deleteTransactions,
  deleteTransactionsIncome,
  getAllExpanseTransactions,
  getAllIncomeTransactions,
  type responseForType,
} from "./transactionthunk";

interface initialObject {
  transactions: transactionDataType[];
  income: transactionDataType[];
  expenses: transactionDataType[];
  loading: boolean;
  error: string;
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}

const initialState: initialObject = {
  income: [],
  expenses: [],
  transactions: [],
  loading: true,
  error: "",
  pagination: {
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0,
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    nextPage(state) {
      if (state.pagination.currentPage == state.pagination.totalPages) return;
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    prevPage(state) {
      if (state.pagination.currentPage == 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<transactionDataType>) => {
          state.loading = false;
          // Append the new transactions to the existing list
          state.transactions = [
            ...state.income,
            ...state.expenses,
            action.payload,
          ];
          action.payload.type == "income"
            ? (state.income = [...state.income, action.payload])
            : (state.expenses = [...state.expenses, action.payload]);
        }
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(getAllIncomeTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllIncomeTransactions.fulfilled,
        (state, action: PayloadAction<responseForType>) => {
          state.loading = false;
          state.transactions = [...state.income, ...state.expenses];
          state.income = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getAllIncomeTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(getAllExpanseTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllExpanseTransactions.fulfilled,
        (state, action: PayloadAction<responseForType>) => {
          state.loading = false;
          // Append the new transactions to the existing list
          state.transactions = [...state.income, ...state.expenses];
          state.expenses = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getAllExpanseTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(deleteTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteTransactions.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.expenses = state.expenses.filter(
            (item) => item._id !== action.payload
          );
          state.transactions = [...state.income, ...state.expenses];
        }
      )
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
    builder
      .addCase(deleteTransactionsIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteTransactionsIncome.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.income = state.income.filter(
            (item) => item._id !== action.payload
          );
          state.transactions = [...state.income, ...state.expenses];
        }
      )
      .addCase(deleteTransactionsIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { nextPage, prevPage } = transactionSlice.actions;
export default transactionSlice.reducer;
