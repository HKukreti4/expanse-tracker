import { TbTrendingDown } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIconByName } from "../../utils/getIcons";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import {
  deleteTransactions,
  getAllExpanseTransactions,
} from "../../redux/transactions/transactionthunk";
import { useEffect } from "react";
import { fetchMonthlyReport } from "../../redux/reports/reportThunk";
import { nextPage, prevPage } from "../../redux/transactions/transactionSlice";
import { BiArrowBack, BiCaretLeft, BiCaretRight } from "react-icons/bi";
const AllExpanses = () => {
  const expenses = useAppSelector((state) => state.transactions.expenses);
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector(
    (state) => state.transactions.pagination
  );
  const handlePagination = async (type: string) => {
    type == "next" ? await dispatch(nextPage()) : await dispatch(prevPage());

    await dispatch(getAllExpanseTransactions());
  };
  useEffect(() => {}, [dispatch, expenses]);
  return (
    <section className="bg-white/50 dark:bg-secondary-500 py-5  md:px-5 px-2 rounded-xl my-4 shadow-sm">
      <div className="mb-4 flex justify-between  p-4 bg-white/50 shadow-md dark:bg-secondary-500 rounded-xl ">
        <h2 className="text-xl font-bold text-primary-400">All Expenses </h2>
        <div className="flex gap-2 items-center">
          <button
            className="bg-primary-400 rounded-md px-1 py-1  disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            disabled={currentPage == 1 ? true : false}
            onClick={() => handlePagination("prev")}
          >
            <BiCaretLeft />
          </button>
          <span>
            {currentPage}/{totalPages}
          </span>
          <button
            className="bg-primary-400 rounded-md px-1 py-1 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => handlePagination("next")}
            disabled={currentPage == totalPages ? true : false}
          >
            <BiCaretRight />
          </button>
        </div>
      </div>
      <div className="flex flex-col     gap-y-2 ">
        {expenses.length > 0 ? (
          expenses.map((item) => {
            const categoryObj =
              typeof item.category == "string" ? null : item.category;
            return (
              <div
                key={item?._id}
                className=" mb-2  py-2 hover:shadow hover:bg-secondary-500 rounded-xl"
              >
                {typeof item.category == "string" ? (
                  item.category
                ) : (
                  <div className="flex items-center justify-between  md:gap-8 gap-1   group py-1 px-2 rounded-md">
                    <div className="flex gap-2 items-center ">
                      <div className="dark:bg-secondary-800 bg-white p-4 rounded-full text-primary-400">
                        {categoryObj?.icon
                          ? (() => {
                              const IconComp = getIconByName(
                                categoryObj?.icon as string
                              );

                              return IconComp ? <IconComp /> : null;
                            })()
                          : null}
                      </div>

                      <div>
                        <h2 className="capitalize line-clamp-1 ">
                          {" "}
                          {categoryObj?.category_name}
                        </h2>
                        <div className="dark:text-white/30 text-black/60">
                          {typeof item.date == "string" ? item.date : null}
                        </div>
                      </div>
                    </div>
                    <div className="capitalize dark:text-white/50   text-secondary-600 line-clamp-1 hidden md:block">
                      {item.note}
                    </div>
                    <div className="flex gap-1 md:gap-2 items-center  justify-center">
                      <div className="dark:bg-secondary-800 bg-red-100 p-1 rounded-full text-red-600 flex items-center gap-2">
                        <span>- ₹ {item.amount.toLocaleString("en-In")} </span>
                        <span className="hidden md:block">
                          <TbTrendingDown />
                        </span>
                      </div>
                      <span className="p-2 text-xl bg-transparent group-hover:dark:bg-secondary-500 group-hover:bg-white group-hover:shadow-sm  group-hover:block rounded-full text-primary-500">
                        <MdEdit
                          className="md:opacity-0  opacity-100 transition-opacity duration-500 group-hover:opacity-100 cursor-pointer"
                          // onClick={() =>
                          //   dispatch(
                          //     deleteTransactionsIncome(item._id as string)
                          //   )
                          // }
                        />
                      </span>
                      <span className="p-2 text-xl bg-transparent group-hover:dark:bg-secondary-500 group-hover:bg-white group-hover:shadow-sm  group-hover:block rounded-full text-red-500">
                        <MdDeleteForever
                          className="md:opacity-0 opacity-100  transition-opacity group-hover:opacity-100 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              deleteTransactions(item._id as string)
                            ).then(() => {
                              dispatch(fetchMonthlyReport({ type: "expense" }));
                            });
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h2>No record found</h2>
        )}
      </div>
    </section>
  );
};

export default AllExpanses;
