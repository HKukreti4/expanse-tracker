import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import { getIconByName } from "../../../utils/getIcons";
import axiosInstance from "../../../axiosInstance";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface recentTransaction {
  _id: string;
  category: {
    category_name: string;
    _id: string;
    icon: string;
  };
  amount: number;
  type: string;
  date: Date;
}

const GetMonthlyTransactions = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<recentTransaction[] | null>([]);
  const token = useAppSelector((state) => state.auth.user?.token);
  const getTransaction = async () => {
    const res = await axiosInstance.get("/reports/monthly-transactions", {
      params: { type: type },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("monthly transaction", res);
    setData(res.data.result);
  };
  useEffect(() => {
    getTransaction();
  }, [dispatch]);
  useEffect(() => {}, [data]);
  if (data?.length == 0) {
    return <h2 className="text-2xl">No record found</h2>;
  }
  return (
    <div className="flex flex-col gap-2 dark:bg-secondary-500 p-2 bg-white shadow-md rounded-xl   order-1 md:order-2 ">
      <h3 className=" px-4 my-5  flex justify-between">
        <span className="text-2xl text-primary-400 font-bold">
          Last 30 days {type}
        </span>{" "}
        <NavLink
          to={`/${type}`}
          className="px-2 py-1  bg-primary-500 text-white rounded-xl"
        >
          See All
        </NavLink>
      </h3>
      {data && data?.length > 0 ? (
        data?.map((item) => {
          const categoryObj =
            typeof item.category == "string" ? null : item.category;
          return (
            <div key={item?._id} className=" mb-2">
              {typeof item.category == "string" ? (
                item.category
              ) : (
                <div className="flex items-center justify-between gap-8  group py-1 px-2 rounded-md">
                  <div className="flex gap-2 items-center justify-between">
                    <div className="dark:bg-secondary-800 bg-white  shadow-2xl p-4 rounded-full text-primary-400">
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
                      <h2 className="capitalize">
                        {categoryObj?.category_name}
                      </h2>
                      <div className="dark:text-white/30 text-black/60">
                        {typeof item.date == "string"
                          ? new Date(item.date).toDateString()
                          : null}
                      </div>
                    </div>
                  </div>
                  {item.type == "expanse" ? (
                    <div className="flex gap-2 items-center  w-35 justify-end">
                      <div className="dark:bg-secondary-800 bg-red-100 p-1 rounded-full text-red-600 flex items-center gap-2">
                        <span>- ₹ {item.amount} </span>
                        <span>
                          <TbTrendingDown />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center   justify-between">
                      <div className="dark:bg-secondary-800 bg-green-100 p-1 rounded-full text-green-600 flex items-center gap-2">
                        <span>+ ₹ {item.amount} </span>
                        <span>
                          <TbTrendingUp />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <h2 className="">No record found</h2>
      )}
    </div>
  );
};

export default GetMonthlyTransactions;
