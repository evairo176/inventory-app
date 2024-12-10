"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "@/config/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
  Dot,
  GalleryVerticalEnd,
  Minus,
  Plus,
  ShoppingBag,
  User2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import React from "react";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/utils/handle-logout";
import { Session } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import Logo from "../global/logo";

export function AppSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const isOpenValue = isOpenMenu();
  const isCurrentPage = pathNameValue();
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  console.log({ state });

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

  function pathNameValue() {
    // Get the current path
    let currentPath = pathname;
    // Split the path into segments
    let pathSegments = currentPath.split("/");
    let newPath = "";

    if (pathSegments.length > 0) {
      // Join the remaining segments to form the new path
      if (pathSegments.length > 3) {
        newPath =
          "/" + pathSegments[1] + "/" + pathSegments[2] + "/" + pathSegments[3];
      } else {
        newPath = currentPath;
      }
    } else {
      newPath = currentPath;
    }

    // Navigate to the new path
    return newPath;
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="pl-2">
                <Logo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroup>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center">
                {sidebarLinks?.map((item, i) => {
                  const Icon = item.icon;
                  if (state === "collapsed") {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={item.module === isOpenValue}
                          asChild
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={item.href as string}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                  <Icon className="h-4 w-4" />
                                  <span className="sr-only">{item.title}</span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.title}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                  return (
                    <React.Fragment key={i}>
                      {item.dropdown ? (
                        <Collapsible
                          key={isOpenValue}
                          defaultOpen={item.module === isOpenValue}
                          className="group/collapsible"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                isActive={item.module === isOpenValue}
                              >
                                <item.icon />
                                {item.title}{" "}
                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.dropdownMenu &&
                                  item.dropdownMenu.map((item) => (
                                    <SidebarMenuSubItem key={item.title}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={item.href === isCurrentPage}
                                      >
                                        <Link
                                          href={item.href}
                                          className="flex items-center justify-between"
                                        >
                                          {item.title}
                                          <Dot />
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.module === isOpenValue}
                            asChild
                          >
                            <Link href={item.href as string}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </React.Fragment>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
