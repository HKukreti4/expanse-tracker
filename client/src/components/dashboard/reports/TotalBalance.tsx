import { FaWallet } from "react-icons/fa";
import type { totalType1 } from "../../Section/SummaryTransactions";

const TotalBalance = ({ total }: { total: totalType1 | null }) => {
  return (
    <div className="md:p-4 p-2 rounded-xl dark:bg-secondary-500 bg-white shadow-md flex flex-col md:flex-row gap-3 items-center">
      <div className="icon-wrapper p-3  rounded-full bg-primary-400 text-white">
        <FaWallet />
      </div>
      <div className="text text-center md:text-left">
        <h3 className="md:text-xl text-sm  dark:text-white/50 text-secondary-800 capitalize">
          Total Balance
        </h3>
        <p
          className={`text-xl font-bold  ${
            total && total?.balance < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          ₹ {total?.balance?.toLocaleString("en-IN") || 0}
        </p>
      </div>
    </div>
  );
};

export default TotalBalance;
