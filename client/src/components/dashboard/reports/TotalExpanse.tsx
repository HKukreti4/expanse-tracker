import { TbTrendingDown } from "react-icons/tb";
import type { totalType1 } from "../../Section/SummaryTransactions";

const TotalExpanse = ({ total }: { total: totalType1 | null }) => {
  return (
    <div className="md:p-4 p-2 rounded-xl dark:bg-secondary-500 bg-white shadow-md flex flex-col md:flex-row gap-3 items-center">
      <div className="icon-wrapper p-3 rounded-full bg-red-400 text-white">
        <TbTrendingDown />
      </div>
      <div className="text text-center md:text-left">
        <h3 className="md:text-xl text-sm  dark:text-white/50 text-secondary-800 capitalize">
          Total Expanse
        </h3>
        <p className="text-xl font-bold">
          ₹ {total?.expanse.toLocaleString("en-IN") || 0}
        </p>
      </div>
    </div>
  );
};

export default TotalExpanse;
