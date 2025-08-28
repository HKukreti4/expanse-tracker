import { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaCog,
  FaDollarSign,
  FaQuestionCircle,
  FaSignOutAlt,
  FaLightbulb,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DarkModeToggle from "./DarkModeToggle";
import Button from "./Button";
import { logoutUser } from "../../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const [open, setOpen] = useState(false);
  const username = useAppSelector((state) => state.auth.user?.name) || "User";
  const role = useAppSelector((state) => state.auth.user?.role) || "user";
  const avatar = useAppSelector((state) => state.auth.user?.avatar);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      {/* Profile button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2  cursor-pointer rounded-full "
      >
        <div className="w-12 h-12 rounded-full border-2 border-white relative overflow-hidden">
          <img
            src={avatar}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="hidden md:block">
          <p className="text-sm font-semibold text-primary-400">{username}</p>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-black dark:text-white shadow-lg dark:border border-white/40 rounded-xl  z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-primary-400">{username}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>

          <ul className="py-2 text-sm text-gray-700 dark:text-white ">
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100  hover:dark:bg-secondary-500 cursor-pointer">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-primary-400 font-bold" : ""
                  } flex  items-center gap-2`
                }
              >
                <FaUser /> Profile
              </NavLink>
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:dark:bg-secondary-500 cursor-pointer">
              <FaCog /> Settings
            </li>
            <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100  hover:dark:bg-secondary-500 cursor-pointer">
              <div className="flex items-center gap-2">
                <FaDollarSign /> Billing Plan
              </div>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                4
              </span>
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:dark:bg-secondary-500 cursor-pointer">
              <FaDollarSign /> Pricing
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:dark:bg-secondary-500 cursor-pointer">
              <FaQuestionCircle /> FAQ
            </li>
            <li className="flex items-center justify-between  gap-2 px-4 py-2 hover:bg-gray-100 hover:dark:bg-secondary-500 cursor-pointer">
              <span className="flex items-center gap-2">
                {" "}
                <FaLightbulb />
                Change Theme
              </span>{" "}
              <span>
                <DarkModeToggle />
              </span>
            </li>
          </ul>
          <div className="border-t border-gray-200">
            <Button
              className=" w-full cursor-pointer text-left  flex items-center gap-2 px-4 text-md py-2 text-primary-400 bg-transparent"
              onClick={() => {
                const logout = async () => {
                  await dispatch(logoutUser());
                  navigate("/login");
                };
                logout();
              }}
            >
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
