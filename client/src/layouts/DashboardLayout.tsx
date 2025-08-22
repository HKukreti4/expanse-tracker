import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/navbar/DashboardNavbar";
import Sidebar from "../components/dashboard/sidebar/Sidebar";

import { closeDashboard } from "../redux/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import { getUserThunk } from "../redux/auth/authThunk";
import { fetchCategories } from "../redux/category/categoryThunk";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSidebarVisible = useAppSelector(
    (state) => state.sidebarToggler.isVisible
  );
  const user = useAppSelector((state) => state.auth.user);

  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (user) {
          await dispatch(getUserThunk(user)).unwrap();
        } else {
          // If no user in Redux, redirect
          navigate("/login");
        }
      } catch (error) {
        // If token invalid or verification failed, redirect to login
        console.log(error);
        navigate("/login");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyUser();
  }, []);
  useEffect(() => {
    if (!isVerifying) {
      dispatch(fetchCategories());
    }
  }, [isVerifying]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Verifying user...</p>
      </div>
    );
  }

  return (
    <div className="flex dark:bg-black bg-white dark:text-white text-black overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`left w-62 lg:w-62 fixed ${
          isSidebarVisible
            ? "translate-x-0 z-10 dark:bg-black bg-white"
            : "-translate-x-full"
        } lg:translate-0 top-0 left-0 h-[100vh] border-r-[1px] border-black/10 dark:border-white/15 transition-transform duration-300`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className="right flex-1 lg:ms-62 min-h-screen w-full md:w-[calc(100%-248px)]"
        onClick={() => {
          if (isSidebarVisible) {
            dispatch(closeDashboard());
          }
        }}
      >
        <DashboardNavbar />
        <div className="mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
