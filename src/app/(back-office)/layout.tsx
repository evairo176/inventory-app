import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
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
    <CheckSessionProvider>
      <div className="relative">
        <Navbar session={session} />
        <Sidebar session={session} />
        <main className="mt-12 w-full  md:pl-72  lg:pl-72">
          <div className="gap-4 p-4 lg:gap-6 lg:p-6">{children}</div>
        </main>
      </div>
    </CheckSessionProvider>
  );
};

export default Layout;
