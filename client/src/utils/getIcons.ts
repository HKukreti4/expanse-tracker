import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import type { IconType } from "react-icons";

// Helper to get icon by string name
export function getIconByName(name: string): IconType | null {
  if (FaIcons[name as keyof typeof FaIcons]) {
    return FaIcons[name as keyof typeof FaIcons] as IconType;
  }
  if (MdIcons[name as keyof typeof MdIcons]) {
    return MdIcons[name as keyof typeof MdIcons] as IconType;
  }
  if (GiIcons[name as keyof typeof GiIcons]) {
    return GiIcons[name as keyof typeof GiIcons] as IconType;
  }
  return null; // fallback
}
