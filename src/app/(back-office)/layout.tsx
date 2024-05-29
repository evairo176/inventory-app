import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
