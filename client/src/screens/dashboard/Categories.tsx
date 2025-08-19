import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import AddCategoryForm from "../../components/forms/AddCategoryForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchCategories,
  deleteCategory,
} from "../../redux/category/categoryThunk";
import { getIconByName } from "../../utils/getIcons";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [showform, setshowForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const role = useAppSelector((state) => state.auth.user?.role);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {}, [categories]);
  const deleteCategoryById = async (id: string) => {
    await dispatch(deleteCategory(id));
  };
  return (
    <section className="px-8 mt-4">
      <div className="flex justify-between items-center bg-white/60 dark:bg-secondary-800 rounded-xl p-3 shadow-md ">
        <h2 className="text-2xl text-primary-500">Categories </h2>
        <Button
          className="rounded-xl cursor-pointer  text-white py-1 px-4"
          onClick={() => setshowForm(true)}
        >
          + Add New
        </Button>
      </div>
      {showform ? <AddCategoryForm setshowForm={setshowForm} /> : null}
      <div className="categorycard grid grid-cols-2 md:grid:cols-2 lg:grid-cols-4 my-4 gap-5">
        {categories.length > 0 && categories ? (
          categories.map((item) => {
            return (
              <div
                key={item._id}
                className="category2  flex-fill flex gap-2 md:gap-5 flex-col md:flex-row md:items-center dark:bg-secondary-800 bg-white/60 rounded-md  px-2 py-4 md:py-8 shadow-md"
              >
                <div className="flex flex-col  ">
                  <h3 className="text-xl line-clamp-1 md:text-3xl text-center flex flex-col md:flex-row gap-3 items-center md:items-start md:text-start capitalize">
                    <div className="text-xl md:text-xl p-2  flex dark:bg-secondary-500 bg-primary-500 text-white dark:text-primary-500 md:justify-center md:items-center rounded-full">
                      {(() => {
                        const IconComp = getIconByName(item.icon);

                        return IconComp ? <IconComp /> : null;
                      })()}
                    </div>
                    <p className="line-clamp-1">{item.category_name}</p>
                  </h3>
                  {item.userId == userId ? (
                    <div className="mt-4 flex gap-2 ">
                      <Button className="text-primary-400 transition  duration-150 hover:bg-primary-500 hover:text-white dark:text-primary-500 py-1 md:py-2 flex items-center  gap-2 rounded-md bg-white-400 dark:bg-secondary-500 px-1 md:px-4 cursor-pointer ">
                        <span className="text-3xl md:text-xl">
                          <MdEdit />
                        </span>
                        <span className="hidden md:inline">Edit</span>
                      </Button>
                      <Button
                        className=" text-red-500 py-1 md:py-2  flex transition duration-150 hover:text-white hover:bg-red-500  items-center gap-2 rounded-md bg-white-400 dark:bg-secondary-500 px-1 md:px-4  justify-center cursor-pointer"
                        onClick={() => deleteCategoryById(item._id)}
                      >
                        <span className="text-3xl md:text-xl">
                          <MdDelete />
                        </span>
                        <span className="hidden md:inline"> Delete</span>
                      </Button>
                    </div>
                  ) : item.userId == null && role == "admin" ? (
                    <div className="mt-4 flex gap-2 mx-auto md:mx-0">
                      <Button
                        className="text-primary-400 transition  duration-150 hover:bg-primary-500 hover:text-white dark:text-primary-500 py-1 md:py-2 flex items-center  gap-2 rounded-md bg-white  dark:bg-secondary-500 px-1 md:px-4 cursor-pointer "
                        onClick={() => {
                          navigate(`/categories?id=${item._id}`);
                          setshowForm(true);
                        }}
                      >
                        <span className="text-3xl md:text-xl">
                          <MdEdit />
                        </span>
                        <span className="hidden md:inline">Edit</span>
                      </Button>
                      <Button
                        className=" text-red-500 py-1 md:py-2  flex transition duration-150 hover:text-white hover:bg-red-500  items-center gap-2 rounded-md bg-white dark:bg-secondary-500 px-1 md:px-4  justify-center cursor-pointer"
                        onClick={() => deleteCategoryById(item._id)}
                      >
                        <span className="text-3xl md:text-xl">
                          <MdDelete />
                        </span>
                        <span className="hidden md:inline"> Delete</span>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <h2>No category found</h2>
        )}
      </div>
    </section>
  );
};

export default Categories;
