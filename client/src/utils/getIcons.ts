import type { IconType } from "react-icons";

import { iconsMap } from "../components/forms/Iconlist";

// Helper to get icon by string name
export function getIconByName(name: string): IconType | null {
  return iconsMap[name] || null;
}
