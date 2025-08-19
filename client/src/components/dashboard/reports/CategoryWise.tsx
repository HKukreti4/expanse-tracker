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

const CategoryWise = () => {
  const [data, setData] = useState([]);
  const token = useAppSelector((state) => state.auth.user?.token);
  const [isMobile, setIsMobile] = useState(false);
  const getData = async () => {
    let res = await axiosInstance.get("/reports/category-wise", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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
  // let colors = [
  //   "#8985D8",
  //   "#95DADE",
  //   "#f44236",
  //   "#ffbb28",
  //   "#00c94f",
  //   "#8884d8",
  // ];
  // const customToolTip=
  return (
    <div className="min-h-130 py-2  col-span-1 order-1 md:order-2 dark:bg-secondary-500 rounded-xl   bg-white shadow-md">
      <h2 className="text-xl mb-4 text-primary-400  p-2 ">
        Transactions Category
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category.category_name"
            fill="#0000"
            innerRadius={isMobile ? 80 : 100}
            outerRadius={isMobile ? 150 : 200}
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
          <Tooltip />
          <Legend formatter={(value) => value.toUpperCase()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryWise;
