import { useState, type ReactNode } from "react";
import type { IconType } from "react-icons";

import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { closeDashboard } from "../../redux/slices/dashboardSlice";

type typeSubmneuLi = {
  submenu: string;
  slug: string;
  icon: ReactNode;
};
const LiwithSubmenu = ({
  mainheading,
  mainicon: MainIcon,
  submenu,
}: {
  mainheading: string;
  mainicon: IconType;
  submenu: typeSubmneuLi[];
}) => {
  const [selectedmenu, setSelectedMenu] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  return (
    <li className="deep-menu ">
      <button
        onClick={() =>
          setSelectedMenu(selectedmenu == "transaction" ? null : "transaction")
        }
        className="w-full dark:bg-gray-800/50  rounded-xl py-2 capitalize ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800"
      >
        <span className="">
          <span className="flex items-center gap-2">
            <span>{MainIcon ? <MainIcon /> : null}</span>
            {mainheading}
            {selectedmenu == "transaction" ? <RxCaretUp /> : <RxCaretDown />}
          </span>
        </span>
      </button>
      <ul
        className={`submenu flex flex-col gap-2 mt-2 ${
          selectedmenu == "transaction" ? "max-h-96" : "max-h-0"
        } overflow-hidden  transition-all duration-300 `}
      >
        {submenu?.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.slug}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "dark:bg-black bg-gray-100 "
                    : "dark:bg-gray-800/50 "
                }   w-full rounded-xl   py-2 capitalize ps-12 flex items-center gap-2 dark:hover:bg-secondary-800 hover:bg-gray-100`
              }
              onClick={() => dispatch(closeDashboard())}
            >
              <span>{item?.icon}</span>
              <span>{item?.submenu}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LiwithSubmenu;
