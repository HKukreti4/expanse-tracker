import { useState, type ReactNode } from "react";
import type { IconType } from "react-icons";

import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { NavLink } from "react-router-dom";

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
  return (
    <li className="deep-menu ">
      <button
        onClick={() =>
          setSelectedMenu(selectedmenu == "transaction" ? null : "transaction")
        }
        className="w-full dark:bg-gray-800/50  py-2 capitalize ps-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-800"
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
        className={`submenu   ${
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
                    ? "dark:bg-black bg-gray-100 hover:bg-red-100"
                    : "dark:bg-black"
                }   w-full  py-2 capitalize ps-12 flex items-center gap-2 dark:hover:bg-secondary-800 hover:bg-gray-200`
              }
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
