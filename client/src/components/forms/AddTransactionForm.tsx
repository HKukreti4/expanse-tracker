import React, { useEffect, useState, type FormEvent } from "react";
import Button from "../buttons/Button";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// ✅ Import your thunk
import toast from "react-hot-toast";
import { createTransaction } from "../../redux/transactions/transactionthunk";
import { isAxiosError } from "axios";
import { fetchMonthlyReport } from "../../redux/reports/reportThunk";

// import { useNavigate, useSearchParams } from "react-router-dom";
interface categoryType {
  _id: string;
  category_name?: string;
  icon?: string;
}
type formprops = {
  setshowForm: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: "income" | "expanse";
};
export interface transactionDataType {
  _id?: string;
  amount: string | number;
  note: string | undefined;
  date: string | Date | undefined | null;
  category: categoryType | undefined | string;
  type: "income" | "expanse";
}

const AddTransactionForm = ({ setshowForm, transaction }: formprops) => {
  const categories = useAppSelector((state) => state.category.categories);
  const [transactionData, setTransactionData] = useState<transactionDataType>({
    amount: "",
    note: "",
    date: null,
    category: "689ae28c79a93650f007f725",
    type: transaction,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {}, [categories]);
  const submithandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTransaction(transactionData));
      await dispatch(fetchMonthlyReport({ type: transaction }));
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong");
    }
    setshowForm(false);
  };
  return (
    <div className="absolute bg-black/70 dark:bg-black/80 backdrop-blur-[4px] flex items-center justify-center  z-[5] top-0 left-0 w-screen h-screen">
      <div className="form-container relative flex flex-col gap-6 items-center  justify-center p-6 rounded-xl bg-white/70 dark:bg-secondary-800 w-[350px] md:w-[400px] shadow-md">
        <div
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={() => setshowForm(false)}
        >
          <MdClose />
        </div>
        <h2 className="text-2xl text-primary-500 capitalize">
          {/* {categoryId ? "Update Category" : "Add New Category"} */} Add{" "}
          {transaction}
        </h2>
        <form className="w-full" onSubmit={(e) => submithandler(e)}>
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min={1}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  [e.target.name]: parseInt(e.target.value),
                })
              }
              className="focus:border-primary-500 w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none dark:bg-black"
            />
          </div>
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="category">Select Category</label>
            <select
              name="category"
              id="category"
              className="dark:bg-black border-2 capitalize focus:border-primary-400 border-black/20 dark:border-white/40  w-full py-2 rounded-md"
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              {categories?.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                  className="bg-secondary-500 capitalize"
                >
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full items-start mb-2 relative">
            <label htmlFor="date">Select Date</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  [e.target.name]: e.target.value,
                })
              }
              //   value={category}
              //   onChange={(e) => setCategory(e.target.value)}
              className="focus:border-primary-500 dark:bg-black   relative z-5  w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full items-start mb-2 relative">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="note"
              required
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  [e.target.name]: e.target.value,
                })
              }
              //   value={category}
              //   onChange={(e) => setCategory(e.target.value)}
              className="focus:border-primary-500 dark:bg-black  resize-none  relative z-5  w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 rounded-md text-white cursor-pointer hover:bg-primary-400 py-1 transition duration-200"
          >
            {/* {categoryId ? "Update" : "Submit"} */} Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
