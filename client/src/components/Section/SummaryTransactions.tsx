import TotalIncome from "../dashboard/reports/TotalIncome";
import TotalBalance from "../dashboard/reports/TotalBalance";
import TotalExpanse from "../dashboard/reports/TotalExpanse";
import axiosInstance from "../../axiosInstance";
import { useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";

export interface totalType1 {
  income: number;
  expense: number;
  balance: number;
}
const SummaryTransactions = () => {
  const token = useAppSelector((state) => state.auth.user?.token);
  const [totals, setTotals] = useState<totalType1 | null>(null);
  const fetchTotals = async () => {
    const res = await axiosInstance.get("/reports/get-balance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res) {
      setTotals(res.data.result[0]);
    }
  };
  useEffect(() => {
    fetchTotals();
  }, []);
  console.log(totals);
  return (
    <div className="mx-2 md:mx-8 my-4 grid grid-cols-3 gap-4">
      <TotalBalance total={totals} />
      <TotalIncome total={totals} />
      <TotalExpanse total={totals} />
    </div>
  );
};

export default SummaryTransactions;
