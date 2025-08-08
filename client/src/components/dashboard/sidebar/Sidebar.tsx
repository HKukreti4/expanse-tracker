import { FcComboChart } from "react-icons/fc";
import { GrDocumentPdf } from "react-icons/gr";
import { MdAddBox, MdClose, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import LiwithSubmenu from "../../buttons/LiwithSubmenu";
import { useDispatch } from "react-redux";
import { closeDashboard } from "../../../redux/slices/dashboardSlice";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";

const Sidebar = () => {
  const dispatch = useDispatch();
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
      <div className="navigations   w-full flex-1  overflow-y-auto ">
        <ul className="text-md ">
          <li className=" ">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "dark:bg-black text-primary-400 font-bold"
                    : "dark:bg-gray-800/50"
                }  w-full   py-2 capitalize ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800`
              }
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
                    ? "dark:bg-black text-primary-400 font-bold"
                    : "dark:bg-gray-800/50"
                }  w-full   py-2 capitalize ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800`
              }
            >
              <span>
                <TbCategoryPlus />
              </span>
              <span>Categories</span>
            </NavLink>
          </li>
          <LiwithSubmenu
            mainheading="Add Transaction"
            mainicon={MdAddBox}
            submenu={[
              {
                submenu: "Add Income",
                slug: "/add-income",
                icon: <FaArrowTrendUp className="text-green-400" />,
              },
              {
                submenu: "Add Expanse",
                slug: "/add-expanse",
                icon: <FaArrowTrendDown className=" text-red-400" />,
              },
            ]}
          />
          <li className=" ">
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-primary-400" : "dark:bg-gray-800/50"
                }  w-full  py-2 capitalize ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800`
              }
            >
              <span>
                <GrDocumentPdf />
              </span>
              <span>Reports</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
