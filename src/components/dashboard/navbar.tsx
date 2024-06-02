"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  CircleUser,
  Dot,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Plus,
  Power,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeModeToggle } from "../global/theme-mode-toggle";

import { AvatarMenuButton } from "./menus/avatar-menu-button";
import QuickAccessMenuButton from "./menus/quick-access-menu-button";
import { ScrollArea } from "../ui/scroll-area";
import { sidebarLinks } from "@/config/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../global/logo";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const defaultValuePathname = defaultPathname();
  const isOpenValue = isOpenMenu();

  function defaultPathname() {
    // Get the current path
    let currentPath = pathname;
    // Split the path into segments
    let pathSegments = currentPath.split("/");
    let newPath = "";
    if (pathSegments.length > 2) {
      // Join the remaining segments to form the new path
      newPath =
        "/" + pathSegments[1] + "/" + pathSegments[2] + "/" + pathSegments[3];
    } else {
      newPath = currentPath;
    }

    // Navigate to the new path
    return newPath;
  }

  function isOpenMenu() {
    // Get the current path
    let currentPath = pathname;
    // Split the path into segments
    let pathSegments = currentPath.split("/");
    let newPath = "";

    if (pathSegments.length > 0) {
      // Join the remaining segments to form the new path
      newPath = "/" + pathSegments[1] + "/" + pathSegments[2];
    } else {
      newPath = currentPath;
    }

    // Navigate to the new path
    return newPath;
  }
  return (
    <header className="fixed left-0 top-0 z-50 w-full md:pl-72 lg:pl-72">
      <div className="flex h-14 items-center gap-4 border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-muted/40 lg:h-[60px] lg:pl-0  lg:pr-6 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <Logo />
            <ScrollArea className="h-[630px]">
              <nav className="grid gap-2 text-lg font-medium ">
                {sidebarLinks?.map((item, i) => {
                  const Icon = item.icon;
                  const isHrefIncluded =
                    item.dropdownMenu &&
                    item.dropdownMenu?.some(
                      (dropdownMenu) =>
                        dropdownMenu.href === defaultValuePathname,
                    );
                  return (
                    <React.Fragment key={i}>
                      {item.dropdown ? (
                        <Accordion
                          key={i}
                          defaultValue={isOpenValue}
                          type="single"
                          collapsible
                        >
                          <AccordionItem
                            value={item.href as string}
                            className="border-b-0"
                          >
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
                            <AccordionContent className="rounded-b-md bg-background pt-2">
                              {item.dropdownMenu &&
                                item.dropdownMenu?.map((menu, i) => {
                                  return (
                                    <Link
                                      key={i}
                                      href={menu.href as string}
                                      className={cn(
                                        "flex items-center gap-3 rounded-lg py-2 pl-6 pr-3 text-lg text-muted-foreground transition-all hover:text-primary",
                                        defaultValuePathname === menu.href &&
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
                            defaultValuePathname === item.href &&
                              "bg-muted text-primary",
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
            </ScrollArea>
            <div className="mt-auto">
              <Button size="sm" className="w-full">
                <Power className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative ml-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <QuickAccessMenuButton />
        <ThemeModeToggle />
        <AvatarMenuButton />
      </div>
    </header>
  );
};

export default Navbar;
