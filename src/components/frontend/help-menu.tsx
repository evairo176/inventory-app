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
  LogOut,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Presentation,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import Link from "next/link";
type HelpMenuProps = {};
export function HelpMenu({}: HelpMenuProps) {
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
        <Button variant={"outline"} size={"sm"}>
          <HelpCircle className="mr-1 h-5 w-5" />
          <span>Help</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetHeader>
            <h2 className="scroll-m-20 border-b pb-3 text-xl font-semibold tracking-tight first:mt-0">
              Need Help with Our services
            </h2>
          </SheetHeader>
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
