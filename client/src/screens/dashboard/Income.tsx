import { useEffect } from "react";
import IncomeOverview from "../../components/Section/IncomeOverview";

import { getAllIncomeTransactions } from "../../redux/transactions/transactionthunk";
import { useAppDispatch } from "../../hooks/hooks";
import AllIncomes from "../../components/Section/AllIncomes";

const Income = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllIncomeTransactions());
  }, []);
  useEffect(() => {}, [dispatch]);
  return (
    <div className="md:mx-8 mx-2 mt-3">
      <IncomeOverview />
      <AllIncomes />
    </div>
  );
};

export default Income;
