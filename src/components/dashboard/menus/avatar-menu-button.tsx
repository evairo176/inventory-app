"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { handleLogout } from "@/utils/handle-logout";
import {
  Headset,
  LogOut,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Presentation,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type AvatarMenuButtonProps = {
  name: string;
  image: string;
  email: string;
};
export function AvatarMenuButton({
  name,
  image,
  email,
}: AvatarMenuButtonProps) {
  const menuLinks = [
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      name: "Profile",
      icon: UserRound,
      href: "/dashboard/profile",
    },
    {
      name: "POS",
      icon: Presentation,
      href: "/dashboard/pos",
    },
  ];

  const assistanceLink = [
    {
      name: "Free 2 hour set-up assistance",
      icon: Headset,
      href: "",
    },
    {
      name: "Chat with Our experts",
      icon: MessageSquareMore,
      href: "",
    },
    {
      name: "Send an Email",
      icon: Mail,
      href: "",
    },
    {
      name: "Talk to Us - 081 999 038 333",
      icon: PhoneCall,
      href: "",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="">
          <Image
            width={215}
            height={215}
            alt={name}
            src={image ? image : "/avatar.png"}
            className="h-10 w-10 rounded-full border border-gray-600"
          />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2 border-b py-4 ">
            <Image
              width={215}
              height={215}
              alt={name}
              src={image ? image : "/avatar.png"}
              className="h-10 w-10 rounded-full border border-gray-600"
            />
            <div>
              <SheetTitle>
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                  {name}
                </h2>
              </SheetTitle>
              <SheetDescription>{email}</SheetDescription>
            </div>
          </div>
          <div className="flex items-center justify-between border-b py-4 ">
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={"/dashboard/account"}>
                <User className="mr-2 h-4 w-4" />
                <span>Manage Account</span>
              </Link>
            </Button>
            <Button onClick={handleLogout} variant={"destructive"} size={"sm"}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SheetHeader>
        {/* Content here  */}
        <div className="grid grid-cols-3 gap-4 border-b py-4">
          {menuLinks?.map((row, key) => {
            const Icon = row.icon;

            return (
              <Link
                key={key}
                href={row.href}
                className="flex flex-col items-center"
              >
                <Icon className="mr-2 h-8 w-8" />
                <span>{row.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="py-4">
          <h2 className="mb-3 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
            Need assistance?
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {assistanceLink?.map((row, key) => {
              const Icon = row.icon;
              return (
                <Button
                  className="justify-start"
                  key={key}
                  variant={"outline"}
                  size={"sm"}
                  asChild
                >
                  <Link href={row.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{row.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
