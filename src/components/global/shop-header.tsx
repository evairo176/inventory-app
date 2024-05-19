import React from "react";
import Logo from "./logo";
import { Button } from "../ui/button";
import { CircleUserRound, LayoutGrid, ShoppingBasket } from "lucide-react";
import Image from "next/image";

type Props = {};

const ShopHeader = (props: Props) => {
  return (
    <header className="border-b border-gray-200 px-4 py-4">
      <div className="md:container">
        <nav className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="mr-2">
              <Logo />
            </div>
            <button className="lg:item-center hidden gap-2 rounded-md bg-slate-900 px-3 py-2 text-slate-50 lg:flex">
              <LayoutGrid className="h-5 w-5" />
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
            <button>
              <CircleUserRound className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;
