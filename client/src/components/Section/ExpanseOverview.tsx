import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import AddTransactionForm from "../forms/AddTransactionForm";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import OverviewGraphs from "../dashboard/graphs/OverviewGraphs";
import { fetchMonthlyReport } from "../../redux/reports/reportThunk";
import { setSelectedMonth } from "../../redux/reports/reportSlice";

const ExpanseOverview = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const selectedMonth = useAppSelector((state) => state.report.selectedMonth);
  const monthlyRecords = useAppSelector(
    (state) => state.report.monthlyExpenseReport
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyReport({ type: "expense" }));
  }, [selectedMonth]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 shadow text-black dark:text-white bg-white/50 dark:bg-secondary-500 py-3 px-2 rounded-xl">
        <div className="text-xl text-primary-400 text-center md:text-left">
          <h3 className="font-bold">Overview</h3>
          <p className="text-sm dark:text-white text-black">
            Track your earning over time and track your income trends
          </p>
        </div>
        <div className="flex flex-row  items-center gap-3">
          {/* Month Selector */}

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

          {/* Add Expense Button */}
          <Button
            className="rounded-xl cursor-pointer text-white py-1 px-4"
            onClick={() => setShowForm(true)}
          >
            + <span className="hidden md:inline">Add Expanse</span>
          </Button>
        </div>
      </div>

      {monthlyRecords.length > 0 ? (
        <div className="graph h-78 bg-white/50 dark:bg-secondary-500 mt-2 rounded-xl md:p-4 p-1 ">
          <OverviewGraphs data={monthlyRecords} />
        </div>
      ) : (
        <h3 className="mt-4 md:text-3xl text-xl">
          No data found for this month
        </h3>
      )}
      {/* Add Transaction Form */}
      {showForm && (
        <AddTransactionForm setshowForm={setShowForm} transaction="expense" />
      )}
    </div>
  );
};

export default ExpanseOverview;
