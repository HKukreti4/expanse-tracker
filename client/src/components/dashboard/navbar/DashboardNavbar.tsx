import { MdMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openDashboard } from "../../../redux/slices/dashboardSlice";
import ProfileButton from "../../buttons/ProfileButton";

function DashboardNavbar() {
  const dispatch = useDispatch();

  return (
    <div className="dark:bg-secondary-800/60 w-screen md:w-[calc(100%-248px)]  z-40 rounded-3xl text-black bg-white  dark:text-white fixed top-0 border-b  border-black/10">
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
        <div className="ioncs flex gap-2 ">
          <div className="flex items-center gap-2">
            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
