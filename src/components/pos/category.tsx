"use client";
import { useGet } from "@/action/global-action";
import { ICategory } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

type CategoryProps = {
  selectedCategoryId: string;
};

const Category = ({ selectedCategoryId }: CategoryProps) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    "pos-categories",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const categories: ICategory[] = data?.data || [];
  return (
    <div className="flex flex-wrap items-center space-x-6 border-b py-3">
      <Button
        size={"sm"}
        variant={selectedCategoryId === "all" ? "default" : "outline"}
        asChild
      >
        <Link href={"/pos?cat=all"} className="flex items-center space-x-2">
          <Image
            className="mr-2 h-8 w-8 rounded-full"
            src="/placeholder.svg"
            height={200}
            width={200}
            alt={"all"}
          />
          <h2 className="text-sm">All</h2>
        </Link>
      </Button>
      {categories?.length > 0 ? (
        categories?.slice(0, 7).map((row, key) => {
          return (
            <Button
              key={key}
              size={"sm"}
              variant={selectedCategoryId === row.id ? "default" : "outline"}
              asChild
            >
              <Link href={`/pos?cat=${row.id}`}>
                <Image
                  className="mr-2 h-6 w-6 rounded-full"
                  src={row.imageUrl ? row.imageUrl : "/placeholder.svg"}
                  height={200}
                  width={200}
                  alt={row.title}
                />
                <h2 className="text-sm">{row.title}</h2>
              </Link>
            </Button>
          );
        })
      ) : (
        <div>
          <h2>No categories found</h2>
        </div>
      )}
    </div>
  );
};

export default Category;
