import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { MdClose } from "react-icons/md";
// import { iconOptions } from "./Iconlist";
// import axiosInstance from "../../axiosInstance";
// import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// ✅ Import your thunk
// import toast from "react-hot-toast";
// import { isAxiosError } from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";

type formprops = {
  setshowForm: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: "income" | "expanse";
};

const AddTransactionForm = ({ setshowForm, transaction }: formprops) => {
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
        <form className="w-full">
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="category">Enter Category Name</label>
            <input
              type="text"
              id="category"
              name="category_name"
              required
              //   value={category}
              //   onChange={(e) => setCategory(e.target.value)}
              className="focus:border-primary-500 w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="category">Select Date</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              //   value={category}
              //   onChange={(e) => setCategory(e.target.value)}
              className="focus:border-primary-500 w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
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
