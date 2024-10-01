"use client";
import { useGet } from "@/action/global-action";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import Product from "./product";
import { useSearchParams } from "next/navigation";
import Category from "./category";
import Orders from "./orders";
// import dynamic from "next/dynamic";
// const Orders = dynamic(() => import("./orders"), { ssr: false });

type Props = {
  // selectedCategoryId: string;
};

function PointOfSale({}: Props) {
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("cat") || "all";

  return (
    <div className="grid grid-cols-12 divide-x-2 divide-gray-200">
      <div className="col-span-9 px-3">
        {/* categories  */}
        <Category selectedCategoryId={selectedCategoryId as string} />
        <Product categoryId={selectedCategoryId as string} />

        {/* products  */}
      </div>
      <div className="col-span-3">
        {/* Make the Order Items header sticky */}
        <h2 className="sticky top-0 z-10 scroll-m-20 border-b bg-white px-3 py-3 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Order Items
        </h2>

        {/* Make this container fill the screen height and use flex layout */}
        <div className="flex h-[calc(100vh-7.5rem)] flex-col pt-3">
          {/* Scrollable area for the order items */}
          <Orders />

          {/* Scrollable Order Summary */}
          <div className="w-full rounded-t-md border-t bg-white px-3 py-3 shadow-lg">
            <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight text-muted-foreground first:mt-0">
              Order Summary
            </h2>
            <div className="space-y-2 border-b">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Items</p>
                <p className="font-medium">4 items</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">SubTotal</p>
                <p className="font-medium">$500</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Tax</p>
                <p className="font-medium">5%</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <h2 className="scroll-m-20 pb-2 text-base font-semibold tracking-tight text-muted-foreground first:mt-0">
                Total
              </h2>
              <h2 className="scroll-m-20  pb-2 text-base font-semibold tracking-tight first:mt-0">
                $6000
              </h2>
            </div>
            <Button className="w-full">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointOfSale;
