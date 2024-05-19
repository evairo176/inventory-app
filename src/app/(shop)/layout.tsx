import Footer from "@/components/global/footer";
import ShopHeader from "@/components/global/shop-header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <ShopHeader />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
