"use client";
import React from "react";
import Item from "./item";
import { useGet, useGetEnable } from "@/action/global-action";
import { IProduct } from "@/types/types";

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
  if (isLoading) return <div>Loading Product...</div>;

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
