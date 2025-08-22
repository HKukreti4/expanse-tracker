import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useAppSelector } from "../../../hooks/hooks";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CategoryWiseTransactions = ({ type }: { type: string }) => {
  const [data, setData] = useState([]);
  const token = useAppSelector((state) => state.auth.user?.token);
  const [isMobile, setIsMobile] = useState(false);
  const getData = async () => {
    if (!type) return;
    let res = await axiosInstance.get(`/reports/category-wise/${type}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log("categorywise income", res);
    setData(res.data.result);
  };
  useEffect(() => {
    getData();
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return window.removeEventListener("resize", checkSize);
  }, []);
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const customToolTip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="flex gap-2 dark:bg-black bg-white shadow-md rounded-xl p-5">
          <span className="capitalize text-primary-400">
            {data.category.category_name}:
          </span>{" "}
          <span className="text-green-400">
            ₹ {data.total.toLocaleString("en-in")}
          </span>
        </div>
      );
    }
  };

  if (data.length == 0) return null;

  return (
    <div className="min-h-120 py-2    order-1 md:order-2 dark:bg-secondary-500 rounded-xl   bg-white shadow-md">
      <h2 className="text-xl my-4 text-primary-400 text-center md:text-left  p-2 ">
        Categorywise {type}
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category.category_name"
            fill="#0000"
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
          <Tooltip content={customToolTip} />
          <Legend
            formatter={(value) => value[0].toUpperCase() + value.slice(1)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryWiseTransactions;
