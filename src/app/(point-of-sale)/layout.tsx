import Sidebar from "@/components/pos/sidebar";
import { authOptions } from "@/lib/auth-option";
import CheckSessionProvider from "@/providers/check-session-provider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "@/components/dashboard/navbar";

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
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Navbar session={session} pos={true} />
          <main className="pt-12">{children}</main>
        </div>
      </div>
    </CheckSessionProvider>
  );
};

export default Layout;
