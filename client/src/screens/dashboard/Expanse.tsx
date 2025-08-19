import { useEffect } from "react";

import { useAppDispatch } from "../../hooks/hooks";
import { getAllExpanseTransactions } from "../../redux/transactions/transactionthunk";
import ExpanseOverview from "./../../components/Section/ExpanseOverview";
import AllExpanses from "../../components/Section/AllExpanses";

const Expanse = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllExpanseTransactions());
  }, []);
  return (
    <div className="md:mx-8 mx-2 mt-3">
      <ExpanseOverview />

      <AllExpanses />
    </div>
  );
};

export default Expanse;
