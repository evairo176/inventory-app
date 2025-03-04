"use client";
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import Product from "./product";
import { useSearchParams } from "next/navigation";
import Category from "./category";
import Orders from "./orders";
import OrderSummary from "./order-summary";
import { SearchComponent } from "../global/search-component";
import Filter from "./filter";
// import dynamic from "next/dynamic";
// const Orders = dynamic(() => import("./orders"), { ssr: false });

type Props = {
  // selectedCategoryId: string;
};

function PointOfSale({}: Props) {
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("cat") || "all";
  const initialCustomer = "670e28065cef75df0eded70c";
  const [selectCustomer, setSelectCustomer] = useState(initialCustomer);

  return (
    <div className="grid grid-cols-12 border-l">
      <div className="col-span-full px-3 md:col-span-8 lg:col-span-9">
        {/* categories  */}
        <Category selectedCategoryId={selectedCategoryId as string} />
        <Filter
          selectCustomer={selectCustomer}
          setSelectCustomer={setSelectCustomer}
        />
        <Product categoryId={selectedCategoryId as string} />

        {/* products  */}
      </div>
      <div className="col-span-full border-l md:col-span-4 lg:col-span-3">
        {/* Make the Order Items header sticky */}
        <div className="flex w-full  items-center justify-between border-b border-t bg-background">
          <h2 className="sticky top-0 z-10 scroll-m-20  px-3 py-3 pb-2 text-base font-semibold tracking-tight first:mt-0">
            Order Items
          </h2>
          <SearchComponent />
        </div>

        {/* Make this container fill the screen height and use flex layout */}
        <div className="flex h-[calc(100vh-7.5rem)] flex-col pt-3">
          {/* Scrollable area for the order items */}
          <Orders />

          {/* Scrollable Order Summary */}
          <OrderSummary
            categoryId={selectedCategoryId as string}
            selectCustomer={selectCustomer}
          />
        </div>
      </div>
    </div>
  );
}

export default PointOfSale;
