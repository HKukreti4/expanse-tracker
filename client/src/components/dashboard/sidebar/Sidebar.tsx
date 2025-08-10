import { FcComboChart } from "react-icons/fc";
import { MdAddBox, MdClose, MdDashboard, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import LiwithSubmenu from "../../buttons/LiwithSubmenu";
import { closeDashboard } from "../../../redux/slices/dashboardSlice";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import Button from "../../buttons/Button";
import { useAppDispatch } from "../../../hooks/hooks";
import { logoutUser } from "../../../redux/auth/authSlice";
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogut = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center  h-screen">
      <div className="log text-4xl items-center flex py-3 dark:bg-black-800/50 w-full md:justify-between lg:justify-center border-b dark:border-white/10 border-black/10 ">
        <span className="flex flex-1 ">
          <FcComboChart /> Expanse
        </span>
        <span className="text-md">
          <MdClose
            className="lg:hidden cursor-pointer"
            onClick={() => dispatch(closeDashboard())}
          />
        </span>
      </div>
      <div className="navigations flex justify-between flex-col  w-full flex-1  overflow-y-auto ">
        <ul className="text-md mx-2 mt-2 flex flex-col gap-1">
          <li className=" ">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "dark:bg-black dark:border-1 dark:border-primary-500 bg-white text-primary-400 font-bold"
                    : "dark:bg-gray-800/50"
                }  w-full   py-2 capitalize ps-4 rounded-xl flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800`
              }
              onClick={() => dispatch(closeDashboard())}
            >
              <span>
                <MdDashboard />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          {/* --- li with sub menu ----  */}
          <li className=" ">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "dark:bg-black bg-white  dark:border-1 dark:border-primary-500 text-primary-400 font-bold"
                    : "dark:bg-gray-800/50"
                }  w-full   py-2 capitalize  rounded-xl ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800`
              }
              onClick={() => dispatch(closeDashboard())}
            >
              <span>
                <TbCategoryPlus />
              </span>
              <span>Categories</span>
            </NavLink>
          </li>
          <LiwithSubmenu
            mainheading="Transactions"
            mainicon={MdAddBox}
            submenu={[
              {
                submenu: "Income",
                slug: "/income",
                icon: <FaArrowTrendUp className="text-green-400" />,
              },
              {
                submenu: "Expanse",
                slug: "/expanse",
                icon: <FaArrowTrendDown className=" text-red-400" />,
              },
            ]}
          />
        </ul>
        <Button
          className=" rounded-xl mb-2 mx-2 py-3 px-4 bg-white dark:text-primary-400 hover:text-white  text-primary-400 dark:bg-secondary-500 hover:bg-primary-500 cursor-pointer text-left flex items-center gap-1"
          onClick={() => handleLogut()}
        >
          <MdLogout /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
