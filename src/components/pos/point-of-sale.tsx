"use client";
import { useGet } from "@/action/global-action";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

import Product from "./product";
import { useSearchParams } from "next/navigation";
import Category from "./category";

type Props = {
  // selectedCategoryId: string;
};

function PointOfSale({}: Props) {
  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get("cat");

  return (
    <div className="grid min-h-screen grid-cols-12 divide-x-2 divide-gray-200">
      <div className="col-span-9 px-3">
        {/* categories  */}
        <Category selectedCategoryId={selectedCategoryId as string} />
        <Product categoryId={selectedCategoryId as string} />

        {/* products  */}
      </div>
      <div className="col-span-3 px-3">
        <h2 className="py-4 font-semibold">Orders</h2>
      </div>
    </div>
  );
}

export default PointOfSale;
