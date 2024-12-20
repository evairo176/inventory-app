import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  BookMarked,
  ChevronRight,
  LogOut,
  MapIcon,
  MessageCircle,
  Package,
  Pencil,
  Phone,
  Star,
  Store,
  User,
} from "lucide-react";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Logo from "../global/logo";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <AlignJustify className="h-6 w-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex w-full flex-col">
        <SheetHeader className="border-b pb-2">
          <Logo />
        </SheetHeader>
        {/* CONTENT HWRE */}

        <div className="w-full flex-1 overflow-auto rounded-md">
          <div className="grid grid-cols-2 gap-2 border-b p-2">
            <Button asChild variant={"outline"}>
              <Link href="/login">
                <User className="mr-1 h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
            <Button variant={"outline"}>
              <BookMarked className="mr-1 h-4 w-4" />
              <span>Signup</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 border-b p-2">
            <Button asChild variant={"secondary"}>
              <Link href="/">
                <MapIcon className="mr-1 h-4 w-4" />
                <div className="block">
                  <span>Track Orders</span>
                  <p className="text-xs text-muted-foreground">
                    View order status
                  </p>
                </div>
              </Link>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link href="/">
                <Star className="mr-1 h-4 w-4" />
                <span>Pending Items</span>
              </Link>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link href="/">
                <Package className="mr-1 h-4 w-4" />
                <span>Sell On Stockify</span>
              </Link>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link href="/">
                <Store className="mr-1 h-4 w-4" />
                <span>Physical Store</span>
              </Link>
            </Button>
          </div>
          <div>
            <div className="mb-4 border-b px-2 py-4">
              <h4 className="text-base font-medium leading-none md:text-2xl">
                Categories
              </h4>
            </div>

            {tags.map((tag) => (
              <>
                <div className="flex items-center justify-between">
                  <div key={tag} className="text-sm text-muted-foreground">
                    {tag}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2 ">
          <Button asChild variant={"outline"}>
            <Link href="#">
              <Phone className="mr-1 h-4 w-4" />
              <span>Call Us</span>
            </Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href="#">
              <MessageCircle className="mr-1 h-4 w-4" />
              <span>Chat with Us</span>
            </Link>
          </Button>
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
