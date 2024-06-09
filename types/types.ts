import { LucideIcon } from "lucide-react";

export interface ISidebarLinks {
  title: string;
  href?: string;
  icon: LucideIcon;
  module: string;
  dropdown: boolean;
  dropdownMenu?: IMenuItem[];
}

export type IMenuItem = {
  title: string;
  href: string;
};

export type ExcelCategoryProps = {
  image: string;
  title: string;
};

export type ICategory = {
  createdAt: string; // ISO date string
  description: string;
  id: string;
  imageUrl: string;
  slug: string;
  status: string; // Assuming status can only be "ACTIVE" or "INACTIVE"
  title: string;
  updatedAt: string; // ISO date string
};
