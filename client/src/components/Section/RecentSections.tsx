import RecentTransactions from "../dashboard/reports/RecentTransactions";
import CategoryWise from "../dashboard/reports/CategoryWise";

const RecentSections = () => {
  return (
    <div className="mx-0 md:mx-6 px-2 mb-4  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentTransactions />
        <CategoryWise />
      </div>
    </div>
  );
};

export default RecentSections;
