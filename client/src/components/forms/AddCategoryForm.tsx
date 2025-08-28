import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { MdClose } from "react-icons/md";
import { iconOptions } from "./Iconlist";
import axiosInstance from "../../axiosInstance";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addCategory } from "../../redux/category/categorySlice";
import { updateCategory } from "../../redux/category/categoryThunk"; // ✅ Import your thunk
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export type formprops = {
  setshowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategoryForm = ({ setshowForm }: formprops) => {
  const [selectedIcon, setSelectedIcon] = useState("FaEllipsisH");
  const [searhParams] = useSearchParams();
  const categoryId = searhParams.get("id");
  const [category, setCategory] = useState<string>("");

  const token = useAppSelector((state) => state.auth.user?.token);
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const data = {
        category_name: category,
        icon: selectedIcon,
      };

      if (categoryId) {
        // ✅ UPDATE existing category
        await dispatch(updateCategory({ id: categoryId, data })).unwrap();
        setshowForm(false);
        navigate("/categories");
      } else {
        // ✅ CREATE new category
        const result = await axiosInstance.post("/category/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result) {
          setshowForm(false);
          navigate("/categories");
          toast.success(result.data.message);
          dispatch(addCategory(result.data.category));
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Failed to process request");
      }
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (categoryId) {
      const selected = categories.find((item) => item._id === categoryId);
      if (selected) {
        setCategory(selected.category_name);
        setSelectedIcon(selected.icon || "FaEllipsisH");
      }
    }
  }, [categoryId, categories]);

  return (
    <div className="absolute bg-black/70 dark:bg-black/80 backdrop-blur-[4px] flex items-center justify-center  z-[5] top-0 left-0 w-screen h-screen">
      <div className="form-container relative flex flex-col gap-6 items-center  justify-center p-6 rounded-xl bg-white/70 dark:bg-secondary-800 w-[350px] md:w-[400px] shadow-md">
        <div
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={() => {
            setshowForm(false);
            navigate("/categories");
          }}
        >
          <MdClose />
        </div>
        <h2 className="text-2xl text-primary-500">
          {categoryId ? "Update Category" : "Add New Category"}
        </h2>
        <form className="w-full" onSubmit={submitHandler}>
          <div className="flex flex-col gap-2 w-full items-start mb-2">
            <label htmlFor="category">Enter Category Name</label>
            <input
              type="text"
              id="category"
              name="category_name"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="focus:border-primary-500 w-full border-2 border-black/20 dark:border-white/40 px-2 py-1 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="icons" className="mb-4">
              Select Icon
            </label>
            <div className="grid md:grid-cols-8 grid-cols-6 gap-4 h-20  md:h-auto overflow-y-auto">
              {iconOptions?.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.value}
                    title={item.label}
                    onClick={() => setSelectedIcon(item.value)}
                  >
                    <div
                      className={`text-black/50  text-2xl rounded flex items-center justify-center cursor-pointer ${
                        selectedIcon === item.value
                          ? "text-primary-500 "
                          : " dark:text-white"
                      }`}
                    >
                      <Icon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-6 rounded-md text-white cursor-pointer hover:bg-primary-400 py-1 transition duration-200"
          >
            {categoryId ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
