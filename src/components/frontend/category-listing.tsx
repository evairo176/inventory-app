"use client";
import { useGet } from "@/action/global-action";
import { ICategory } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { truncateText } from "@/utils/truncate-text";

type CategoryListingProps = {};

const CategoryListing = (props: CategoryListingProps) => {
  const {
    data: categoryData,
    error,
    isLoading,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    "shop-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <ScrollArea className="my-6 w-full gap-4 whitespace-nowrap">
        <div className="flex w-max gap-8 p-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((row, key) => {
            return (
              <div key={key} className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-16 rounded-md " />
                <Skeleton className="h-5 w-16 rounded-md " />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  const categories = categoryData?.data;
  return (
    <ScrollArea className="my-6 w-full gap-4 whitespace-nowrap">
      {categories?.length > 0 ? (
        <>
          <div className="flex w-max gap-8 p-4">
            {categories?.map((cat: ICategory) => {
              return (
                <Link
                  className="flex flex-col items-center gap-2"
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                >
                  <Image
                    src={cat.imageUrl ?? "placeholder.svg"}
                    alt={cat.title}
                    width={200}
                    height={200}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <span className="text-xs">{truncateText(cat.title, 15)}</span>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div>Category not found</div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryListing;
