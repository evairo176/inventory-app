import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Headset,
  HelpCircle,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Presentation,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Link from "next/link";
type CartMenuProps = {};
export function CartMenu({}: CartMenuProps) {
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
        <button className="relative inline-flex items-center rounded-lg bg-transparent p-3 text-center text-sm font-medium text-white ">
          <ShoppingCart className="text-lime-700 dark:text-lime-500" />
          <span className="sr-only">Cart</span>
          <div className="absolute left-0 top-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500  text-xs font-bold text-white dark:border-gray-900">
            0
          </div>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1>Need help with Our Services</h1>
          </SheetTitle>
          <SheetDescription></SheetDescription>
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
      </SheetContent>
    </Sheet>
  );
}
