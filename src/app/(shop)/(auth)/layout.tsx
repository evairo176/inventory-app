import { authOptions } from "@/lib/auth-option";
import NextAuthProvider from "@/providers/next-auth-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  // if (session !== null) {
  //   return redirect("/dashboard");
  // }
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
