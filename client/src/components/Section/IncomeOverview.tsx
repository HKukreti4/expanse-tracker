import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import AddTransactionForm from "../forms/AddTransactionForm";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import OverviewGraphs from "../dashboard/graphs/OverviewGraphs";
import { fetchMonthlyReport } from "../../redux/reports/reportThunk";
import { setSelectedMonth } from "../../redux/reports/reportSlice";

const IncomeOverview = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const selectedMonth = useAppSelector((state) => state.report.selectedMonth);
  const monthlyRecords = useAppSelector(
    (state) => state.report.monthlyIncomeReport
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyReport({ type: "income" }));
  }, [selectedMonth]);
  useEffect(() => {}, [monthlyRecords]);
  return (
    <div className="">
      <div className="flex  items-center justify-between gap-4 shadow text-black dark:text-white bg-white/50 dark:bg-secondary-500 py-3 px-2 rounded-xl">
        <div className="text-xl text-primary-400">
          <h3 className="font-bold">Overview</h3>
          <p className="text-sm dark:text-white text-black">
            Track your earning over time and track your income trends
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => dispatch(setSelectedMonth(Number(e.target.value)))}
            className="px-2 py-1 rounded-lg border dark:bg-black bg-white  dark:text-white"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
          <Button
            className="rounded-xl cursor-pointer text-white py-1 px-4"
            onClick={() => setShowForm(true)}
          >
            + Add Income
          </Button>
        </div>
      </div>

      {monthlyRecords.length > 0 ? (
        <div className="graph h-78 bg-white shadow-md dark:bg-secondary-500 mt-2 rounded-xl  p-4 ">
          <OverviewGraphs data={monthlyRecords} />
        </div>
      ) : (
        <h3 className="mt-4 md:text-3xl text-xl">
          No data found for this month
        </h3>
      )}

      {showForm && (
        <AddTransactionForm setshowForm={setShowForm} transaction="income" />
      )}
    </div>
  );
};

export default IncomeOverview;
