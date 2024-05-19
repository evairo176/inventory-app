import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainProviders from "@/providers/main-provider";
import Footer from "@/components/global/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MainProviders>
          {children}
          <Footer />
        </MainProviders>
      </body>
    </html>
  );
}
