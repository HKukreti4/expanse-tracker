// transactionSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { transactionDataType } from "../../components/forms/AddTransactionForm";
import {
  createTransaction,
  deleteTransactions,
  deleteTransactionsIncome,
  getAllExpanseTransactions,
  getAllIncomeTransactions,
} from "./transactionthunk";

interface initialObject {
  transactions: transactionDataType[];
  income: transactionDataType[];
  expanses: transactionDataType[];
  loading: boolean;
  error: string;
}

const initialState: initialObject = {
  income: [],
  expanses: [],
  transactions: [],
  loading: true,
  error: "",
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
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
            ...state.expanses,
            action.payload,
          ];
          action.payload.type == "income"
            ? (state.income = [...state.income, action.payload])
            : (state.expanses = [...state.expanses, action.payload]);
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
        (state, action: PayloadAction<transactionDataType[]>) => {
          state.loading = false;
          // Append the new transactions to the existing list
          state.transactions = [...state.income, ...state.expanses];

          state.income = action.payload;
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
        (state, action: PayloadAction<transactionDataType[]>) => {
          state.loading = false;
          // Append the new transactions to the existing list
          state.transactions = [...state.income, ...state.expanses];

          state.expanses = action.payload;
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
          state.expanses = state.expanses.filter(
            (item) => item._id !== action.payload
          );
          state.transactions = [...state.income, ...state.expanses];
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
          state.transactions = [...state.income, ...state.expanses];
        }
      )
      .addCase(deleteTransactionsIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default transactionSlice.reducer;
