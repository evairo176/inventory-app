"use client";
import {
  BarChart4,
  Bell,
  BriefcaseBusiness,
  Cable,
  ChevronDown,
  ChevronRight,
  Dot,
  Home,
  Package,
  Package2,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ISidebarLinks } from "../../../types/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState<string>("false");
  const pathname = usePathname();
  const defaultValuePathname = defaultPathname();
  console.log({ defaultValuePathname });
  const sidebarLinks: ISidebarLinks[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      dropdown: false,
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

  function defaultPathname() {
    // Get the current path
    let currentPath = pathname;

    // Split the path into segments
    let pathSegments = currentPath.split("/");
    let newPath = "";
    if (pathSegments.length > 2) {
      // Join the remaining segments to form the new path
      newPath = "/" + pathSegments[1] + "/" + pathSegments[2];
    } else {
      newPath = currentPath;
    }

    // Navigate to the new path
    return newPath;
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebarLinks?.map((item, i) => {
              const Icon = item.icon;
              const isHrefIncluded =
                item.dropdownMenu &&
                item.dropdownMenu?.some(
                  (dropdownMenu) => dropdownMenu.href === pathname,
                );
              return (
                <React.Fragment key={i}>
                  {item.dropdown ? (
                    <Accordion
                      key={i}
                      onValueChange={setIsOpen}
                      defaultValue={defaultValuePathname}
                      type="single"
                      collapsible
                    >
                      <AccordionItem value={item.href as string}>
                        <AccordionTrigger
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground  transition-all hover:text-primary ",
                            isHrefIncluded && "bg-muted text-primary",
                          )}
                        >
                          <div className="flex gap-3">
                            <Icon className="h-4 w-4" /> {item.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.dropdownMenu &&
                            item.dropdownMenu?.map((menu, i) => {
                              return (
                                <Link
                                  key={i}
                                  href={menu.href as string}
                                  className={cn(
                                    "flex items-center gap-3 rounded-lg py-2 pl-6 pr-3 text-muted-foreground transition-all hover:text-primary",
                                    pathname === menu.href &&
                                      "bg-muted text-primary",
                                  )}
                                >
                                  <div className="ml-4">{menu.title}</div>
                                  <Dot className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full" />
                                </Link>
                              );
                            })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={item.href as string}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href && "bg-muted text-primary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
