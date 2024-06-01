import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <main className="mt-12 w-full  md:pl-72  lg:pl-72">
        <div className="gap-4 p-4 lg:gap-6 lg:p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
