import { useState } from "react";
import Button from "../buttons/Button";
import AddTransactionForm from "../forms/AddTransactionForm";

const IncomeOverview = () => {
  const [showForm, setShowForm] = useState<boolean>(true);
  return (
    <div>
      <div className="flex items-center justify-between shadow text-black dark:text-white bg-white/50 dark:bg-secondary-500 py-3 px-2 rounded-xl">
        <div className="text-xl text-primary-400">
          <h3 className="font-bold">Overview</h3>
          <p className="text-sm dark:text-white  text-black ">
            Track your earning over time and track your income trends
          </p>
        </div>
        <Button className="rounded-xl cursor-pointer  text-white py-1 px-4">
          + Add Income
        </Button>
      </div>
      <div className="graph h-72 bg-white/50 dark:bg-secondary-500 mt-2 rounded-xl">
        Graph
      </div>
      {showForm ? (
        <AddTransactionForm setshowForm={setShowForm} transaction="income" />
      ) : null}
    </div>
  );
};

export default IncomeOverview;
