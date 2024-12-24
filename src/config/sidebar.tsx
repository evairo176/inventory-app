import {
  BadgeDollarSign,
  BarChart4,
  BriefcaseBusiness,
  Cable,
  FolderTree,
  Home,
  Presentation,
  Settings,
  Users,
} from "lucide-react";
import { ISidebarLinks } from "../types/types";

export const sidebarLinks: ISidebarLinks[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    module: "dashboard",
    icon: Home,
    dropdown: false,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    module: "users",
    icon: Users,
    dropdown: true,
    dropdownMenu: [
      {
        title: "Users",
        href: "/dashboard/users",
      },
      {
        title: "Roles",
        href: "/dashboard/users/roles",
      },
      {
        title: "Permissions",
        href: "/dashboard/users/permissions",
      },
    ],
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory/products",
    module: "inventory",
    icon: BriefcaseBusiness,
    dropdown: true,
    dropdownMenu: [
      {
        title: "Main Category",
        href: "/dashboard/inventory/main-category",
      },
      {
        title: "Category",
        href: "/dashboard/inventory/category",
      },
      {
        title: "Sub Category",
        href: "/dashboard/inventory/sub-category",
      },
      {
        title: "Brands",
        href: "/dashboard/inventory/brands",
      },
      {
        title: "Units",
        href: "/dashboard/inventory/units",
      },
      {
        title: "Products",
        href: "/dashboard/inventory/products",
      },
      {
        title: "Warehouse",
        href: "/dashboard/inventory/warehouse",
      },
      {
        title: "Suppliers",
        href: "/dashboard/inventory/suppliers",
      },
      {
        title: "Advert",
        href: "/dashboard/inventory/advert",
      },
    ],
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
    module: "sales",
    icon: BadgeDollarSign,
    dropdown: true,
    dropdownMenu: [
      {
        title: "Sales",
        href: "/dashboard/sales",
      },
      {
        title: "Payment",
        href: "/dashboard/sales/payments",
      },
      {
        title: "Quotations",
        href: "/dashboard/sales/quatations",
      },
      {
        title: "Customers",
        href: "/dashboard/sales/customers",
      },
    ],
  },
  {
    title: "Stock",
    href: "/dashboard/stock/transfer",
    module: "stock",
    icon: FolderTree,
    dropdown: true,
    dropdownMenu: [
      {
        title: "Stock Transfer",
        href: "/dashboard/stock/transfer",
      },
      {
        title: "Stock Adjustment",
        href: "/dashboard/stock-adjustment",
      },
    ],
  },
  {
    title: "POS",
    href: "/pos",
    module: "pos",
    icon: Presentation,
    dropdown: false,
  },
  {
    title: "API Integrations",
    href: "/dashboard/api",
    module: "integrations",
    icon: Cable,
    dropdown: false,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    module: "settings",
    icon: Settings,
    dropdown: false,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    module: "reports",
    icon: BarChart4,
    dropdown: false,
  },
];
