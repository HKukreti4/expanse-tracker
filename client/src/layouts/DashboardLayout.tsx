import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/navbar/DashboardNavbar";
import Sidebar from "../components/dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex dark:bg-black  bg-white ">
      <div className="left w-25  lg:w-62 fixed -translate-x-full lg:translate-0 top-0 left-0 h-[100vh] border-r-2 border-black/10 dark:border-white/15">
        <Sidebar />
      </div>
      <div className="right flex-1  lg:ms-62 min-h-screen ">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
