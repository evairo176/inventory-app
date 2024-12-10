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
import {
  Headset,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquareMore,
  Minus,
  PhoneCall,
  Plus,
  Presentation,
  Settings,
  ShoppingCart,
  Trash,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-flex items-center rounded-lg bg-transparent p-3 text-center text-sm font-medium text-white ">
          <ShoppingCart className="text-lime-700 dark:text-lime-500" />
          <span className="sr-only">Cart</span>
          <div className="absolute -top-0 end-6 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500  text-xs font-bold text-white dark:border-gray-900">
            0
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <h2 className="scroll-m-20 border-b pb-3 text-xl font-semibold tracking-tight first:mt-0">
            Shopping Cart (2)
          </h2>
        </SheetHeader>
        {/* CONTENT HWRE */}
        <div className="">
          <div className="flex justify-between gap-4 border-b py-3 ">
            <Image
              width={200}
              height={200}
              alt="cart image"
              src="/product.jpg"
              className="h-16 w-16 rounded-lg"
            />
            <div className="space-y-2">
              <h2 className="text-xs font-medium">
                Best Nice laptop i have seen
              </h2>
              <button className="flex items-center text-xs text-red-500">
                <Trash className="mr-1 h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
            <div className="space-y-2">
              <h2 className="text-sx">$199.00</h2>
              <div className="flex items-center space-x-3">
                <button className="flex h-7 w-10 items-center justify-center rounded border shadow">
                  <Minus className="h-4 w-4" />
                </button>

                <p>1</p>
                <button className="flex h-7 w-10 items-center justify-center rounded border bg-slate-800 text-white shadow">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 border-b py-3 ">
            <Image
              width={200}
              height={200}
              alt="cart image"
              src="/product.jpg"
              className="h-16 w-16 rounded-lg"
            />
            <div className="space-y-2">
              <h2 className="text-xs font-medium">
                Best Nice laptop i have seen
              </h2>
              <button className="flex items-center text-xs text-red-500">
                <Trash className="mr-1 h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
            <div className="space-y-2">
              <h2 className="text-sx">$199.00</h2>
              <div className="flex items-center space-x-3">
                <button className="flex h-7 w-10 items-center justify-center rounded border shadow">
                  <Minus className="h-4 w-4" />
                </button>

                <p>1</p>
                <button className="flex h-7 w-10 items-center justify-center rounded border bg-slate-800 text-white shadow">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mb-3 space-y-1 border-b py-3">
            <div className="flex items-center justify-between text-sm">
              <h2 className="font-medium">Subtotal</h2>
              <p>$1930.00</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h2 className="font-medium">Tax</h2>
              <p>$10.00</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <h2 className="font-medium">Total</h2>
              <p>$1930.00</p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"} type="submit">
              Continue Shopping
            </Button>
          </SheetClose>
          <Button asChild>
            <Link href="/checkout">
              <span>Proceed to Checkout</span>
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
