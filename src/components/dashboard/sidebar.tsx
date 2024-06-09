"use client";
import { Bell, Dot, Power } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import Logo from "../global/logo";
import { sidebarLinks } from "@/config/sidebar";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const isOpenValue = isOpenMenu();

  function isOpenMenu() {
    // Get the current path
    let currentPath = pathname;
    // Split the path into segments
    let pathSegments = currentPath.split("/");
    let newPath = "";

    if (pathSegments.length > 0) {
      // Join the remaining segments to form the new path
      if (pathSegments.length === 2) {
        newPath = pathSegments[1];
      } else {
        newPath = pathSegments[2];
      }
    } else {
      newPath = currentPath;
    }

    // Navigate to the new path
    return newPath;
  }

  return (
    <div className="fixed left-0 top-0 hidden w-72 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-muted/40 md:block">
      <div className="flex max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <ScrollArea className="h-[630px]">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarLinks?.map((item, i) => {
                const Icon = item.icon;

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
                          value={item.module}
                          className="border-b-0"
                        >
                          <AccordionTrigger
                            className={cn(
                              "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground  transition-all hover:text-primary ",
                              item.module === isOpenValue &&
                                "bg-muted text-primary",
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
                                      "flex items-center gap-3 rounded-lg py-2 pl-6 pr-3 text-muted-foreground transition-all hover:text-primary",
                                      menu.href === pathname &&
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
                          item.module === isOpenValue &&
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
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            <Power className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
