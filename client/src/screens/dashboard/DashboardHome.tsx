import RecentSections from "../../components/Section/RecentSections";
import SummaryTransactions from "../../components/Section/SummaryTransactions";

const DashboardHome = () => {
  return (
    <>
      <SummaryTransactions />
      <RecentSections />
    </>
  );
};

export default DashboardHome;
