import { TbTrendingDown } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIconByName } from "../../utils/getIcons";
import { MdDeleteForever } from "react-icons/md";
import { deleteTransactions } from "../../redux/transactions/transactionthunk";
import { useEffect } from "react";

const AllExpanses = () => {
  const expanses = useAppSelector((state) => state.transactions.expanses);
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);
  return (
    <section className="bg-white/50 dark:bg-secondary-500 p-5 rounded-xl my-4 shadow-sm">
      <h2 className="mb-4 text-xl p-4 bg-white/50 shadow-md dark:bg-secondary-500 rounded-xl font-bold text-primary-400">
        All Expanses
      </h2>
      <div className="md:grid-rows-5 grid-rows-10 grid-flow-col grid gap-x-12 gap-y-4 ">
        {expanses.length > 0 ? (
          expanses.map((item) => {
            const categoryObj =
              typeof item.category == "string" ? null : item.category;
            return (
              <div key={item?._id} className=" mb-2">
                {typeof item.category == "string" ? (
                  item.category
                ) : (
                  <div className="flex items-center justify-between gap-8  group py-1 px-2 rounded-md">
                    <div className="flex gap-2 items-center ">
                      <div className="dark:bg-secondary-800 bg-white p-4 rounded-full text-primary-400">
                        {categoryObj?.icon
                          ? (() => {
                              const IconComp = getIconByName(
                                categoryObj?.icon as string
                              );
                              console.log(categoryObj.icon);

                              return IconComp ? <IconComp /> : null;
                            })()
                          : null}
                      </div>

                      <div>
                        <h2 className="capitalize">
                          {" "}
                          {categoryObj?.category_name}
                        </h2>
                        <div className="dark:text-white/30 text-black/60">
                          {typeof item.date == "string" ? item.date : null}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center  w-35 justify-center">
                      <div className="dark:bg-secondary-800 bg-red-100 p-1 rounded-full text-red-600 flex items-center gap-2">
                        <span>- ₹ {item.amount} </span>
                        <span>
                          <TbTrendingDown />
                        </span>
                      </div>
                      <span className="p-2 text-xl bg-transparent group-hover:dark:bg-secondary-500 group-hover:bg-white group-hover:shadow-sm  group-hover:block rounded-full text-red-500">
                        <MdDeleteForever
                          className="opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                          onClick={() =>
                            dispatch(deleteTransactions(item._id as string))
                          }
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
