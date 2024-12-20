import { CategoryHeader } from "@/components/frontend/category-header";
import CategoryHeaderMobile from "@/components/frontend/category-header-mobile";
import Footer from "@/components/global/footer";
import ShopHeader from "@/components/global/shop-header";
import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <ShopHeader session={session} />
      <CategoryHeader />
      <CategoryHeaderMobile />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
