import RecentTransactions from "../dashboard/reports/RecentTransactions";
import CategoryWise from "../dashboard/reports/CategoryWise";
import CategoryWiseTransactions from "../dashboard/reports/CategoryWiseTransactions";
import GetMonthlyTransactions from "../dashboard/reports/GetMonthlyTransactions";

const RecentSections = () => {
  return (
    <div className="mx-0 md:mx-6 px-2 mb-4  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentTransactions />
        <CategoryWise />
        <CategoryWiseTransactions type="income" />
        <GetMonthlyTransactions type="income" />
        <GetMonthlyTransactions type="expense" />
        <CategoryWiseTransactions type="expense" />
      </div>
    </div>
  );
};

export default RecentSections;
