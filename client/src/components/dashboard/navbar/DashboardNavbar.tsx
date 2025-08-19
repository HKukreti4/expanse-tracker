import { MdMenu } from "react-icons/md";
import DarkModeToggle from "../../buttons/DarkModeToggle";
import { useDispatch } from "react-redux";
import { openDashboard } from "../../../redux/slices/dashboardSlice";
import { useAppSelector } from "../../../hooks/hooks";

function DashboardNavbar() {
  const dispatch = useDispatch();
  const username = useAppSelector((state) => state.auth.user?.name) || "User";
  const role = useAppSelector((state) => state.auth.user?.role) || "user";
  return (
    <div className="dark:bg-secondary-800/60   rounded-3xl text-black bg-white  dark:text-white sticky top-0 border-b  border-black/10">
      <div className="navbar flex justify-between items-center  px-4 md:px-8 py-3 backdrop-blur-3xl">
        <div className="search flex items-center gap-2 ">
          <MdMenu
            className="text-2xl lg:hidden cursor-pointer"
            onClick={() => dispatch(openDashboard())}
          />
          <input
            type="text"
            placeholder="Search ..."
            className="border-[2px] w-25 md:w-56 border-primary-400 bg-white dark:bg-secondary-500 outline-0 px-4 py-1 rounded-md"
          />
        </div>
        <div className="ioncs flex gap-2">
          <DarkModeToggle />
          <div className="flex items-center gap-2">
            <h3
              className={`  font-bold ${
                role == "admin"
                  ? "text-primary-400"
                  : "dark:text-white text-black"
              }`}
            >
              {username}
            </h3>
            <div className="circle w-10 h-10 rounded-full bg-red-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
