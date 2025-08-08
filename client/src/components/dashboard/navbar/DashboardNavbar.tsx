import { MdMenu } from "react-icons/md";
import DarkModeToggle from "../../buttons/DarkModeToggle";
import { useDispatch } from "react-redux";
import { openDashboard } from "../../../redux/slices/dashboardSlice";

function DashboardNavbar() {
  const dispatch = useDispatch();
  return (
    <div className="dark:bg-gray-800/50 text-black dark:text-white sticky top-0 border-b border-black/10">
      <div className="navbar flex justify-between items-center px-4 md:px-8 py-3">
        <div className="search flex items-center gap-2 ">
          <MdMenu
            className="text-2xl lg:hidden cursor-pointer"
            onClick={() => dispatch(openDashboard())}
          />
          <input
            type="text"
            placeholder="Search ..."
            className="border-[2px] w-25 md:w-56 border-primary-400 bg-gray-200/20 outline-0 px-4 py-1 rounded-md"
          />
        </div>
        <div className="ioncs flex gap-2">
          <DarkModeToggle />
          <div className="circle w-10 h-10 rounded-full bg-red-50"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
