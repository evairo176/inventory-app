"use client";
import React from "react";
import Item from "./item";
import { useGet, useGetEnable } from "@/action/global-action";
import { IProduct } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

type ProductProps = {
  categoryId: string;
};

const Product = ({ categoryId = "all" }: ProductProps) => {
  const { data, error, isLoading } = useGetEnable(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?categoryId=${categoryId}`,
    `pos-products-${categoryId}`,
    categoryId,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4 py-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((row, key) => {
          return (
            <div className="flex flex-col space-y-3" key={key}>
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      {data?.data?.length > 0 ? (
        data?.data?.map((row: IProduct) => {
          return <Item item={row} key={row.id} />;
        })
      ) : (
        <div>
          <h2>No product found</h2>
        </div>
      )}
    </div>
  );
};

export default Product;
