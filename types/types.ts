import { LucideIcon } from "lucide-react";

export interface ISidebarLinks {
  title: string;
  href?: string;
  icon: LucideIcon;
  dropdown: boolean;
  dropdownMenu?: IMenuItem[];
}

export type IMenuItem = {
  title: string;
  href: string;
};
