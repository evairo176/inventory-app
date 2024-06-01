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
import { ISidebarLinks } from "../../types/types";

export const sidebarLinks: ISidebarLinks[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    dropdown: false,
  },
  {
    title: "Users",
    href: "/dashboard/users",
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
    ],
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: BriefcaseBusiness,
    dropdown: true,
    dropdownMenu: [
      {
        title: "Categories",
        href: "/dashboard/inventory/categories",
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
    ],
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
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
    href: "/dashboard/stock",
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
    href: "/dashboard/pos",
    icon: Presentation,
    dropdown: false,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: Cable,
    dropdown: false,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    dropdown: false,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart4,
    dropdown: false,
  },
];
