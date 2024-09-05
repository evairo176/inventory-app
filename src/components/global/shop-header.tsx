"use client";
import React from "react";
import Logo from "./logo";
import { LayoutGrid, ShoppingBasket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { generateInitials } from "@/utils/generate-initial-name-user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type ShopHeaderProps = {
  session: Session | null;
};

const ShopHeader = ({ session }: ShopHeaderProps) => {
  const user = session?.user;
  const initialName = user?.id ? generateInitials(user?.name as string) : "ER";
  const router = useRouter();
  async function handleLogout() {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="border-b border-gray-200 px-4 py-4">
      <div className="md:container">
        <nav className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="mr-2">
              <Logo />
            </div>
            <button className="lg:item-center hidden gap-2 rounded-md bg-slate-900 px-3 py-2 text-slate-50 lg:flex">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs">Catalogue</span>
            </button>
          </div>
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search for product.."
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center gap-2">
            <button>
              <ShoppingBasket className="h-5 w-5" />
            </button>
            {user?.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{initialName}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={handleLogout}>Logout</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;
