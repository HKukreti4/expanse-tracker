import { GiMeal } from "react-icons/gi";
import {
  FaShoppingBasket,
  FaPlane,
  FaGasPump,
  FaShoppingBag,
  FaHospital,
  FaBookOpen,
  FaHome,
  FaPiggyBank,
  FaMoneyBillWave,
  FaChartLine,
  FaGift,
  FaEllipsisH,
  FaCar,
} from "react-icons/fa";
import { MdOutlineReceiptLong, MdMovie } from "react-icons/md";
import type { IconType } from "react-icons";

export interface IconOption {
  label: string;
  value: string;
  icon: IconType;
}

export const iconOptions: IconOption[] = [
  { label: "Food & Dining", value: "GiMeal", icon: GiMeal },
  { label: "Groceries", value: "FaShoppingBasket", icon: FaShoppingBasket },
  { label: "Travel & Transport", value: "FaPlane", icon: FaPlane },
  { label: "Fuel", value: "FaGasPump", icon: FaGasPump },
  { label: "Shopping", value: "FaShoppingBag", icon: FaShoppingBag },
  {
    label: "Bills & Utilities",
    value: "MdOutlineReceiptLong",
    icon: MdOutlineReceiptLong,
  },
  { label: "Entertainment", value: "MdMovie", icon: MdMovie },
  { label: "Healthcare", value: "FaHospital", icon: FaHospital },
  { label: "Education", value: "FaBookOpen", icon: FaBookOpen },
  { label: "Rent / Housing", value: "FaHome", icon: FaHome },
  { label: "Savings", value: "FaPiggyBank", icon: FaPiggyBank },
  { label: "Salary / Income", value: "FaMoneyBillWave", icon: FaMoneyBillWave },
  { label: "Investments", value: "FaChartLine", icon: FaChartLine },
  { label: "Gifts & Donations", value: "FaGift", icon: FaGift },
  { label: "Car", value: "FaCar", icon: FaCar },
  { label: "Miscellaneous", value: "FaEllipsisH", icon: FaEllipsisH },
];
