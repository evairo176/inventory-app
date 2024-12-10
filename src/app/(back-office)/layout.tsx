import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Breadcrumb from "@/components/dashboard/breadcrumb";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { ThemeModeToggle } from "@/components/global/theme-mode-toggle";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth-option";
import CheckSessionProvider from "@/providers/check-session-provider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  if (session === null) {
    return redirect("/login");
  }

  return (
    // <CheckSessionProvider>

    //   <div className="relative">
    //     <Navbar session={session} />
    //     <Sidebar session={session} />
    //     <main className="mt-12 w-full  md:pl-72  lg:pl-72">
    //       <div className="gap-4 p-4 lg:gap-6 lg:p-6">{children}</div>
    //     </main>
    //   </div>
    // </CheckSessionProvider>
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb />
          </div>
          <ThemeModeToggle />
        </header>
        <main className="gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
