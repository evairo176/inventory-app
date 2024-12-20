"use client";
import { useGet } from "@/action/global-action";
import { ICategory, ISubCategory } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";

type CategoryProps = {};

const CategoryHeaderMobile = ({}: CategoryProps) => {
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("cat") || "all";

  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    "pos-sub-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <ScrollArea className="block w-full gap-4 whitespace-nowrap sm:hidden">
        <div className="flex w-max space-x-4 p-4">
          {[1, 2, 3, 4, 5, 6]?.map((row, key) => {
            return (
              <div key={key} className="flex items-center space-x-2">
                <Skeleton className="h-10 w-28 rounded-md " />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );

  const categories: ISubCategory[] = data?.data || [];
  return (
    <ScrollArea className="block w-full whitespace-nowrap sm:hidden">
      <div className="flex w-max gap-2 p-2">
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
                    src={
                      row.category.imageUrl
                        ? row.category.imageUrl
                        : "/placeholder.svg"
                    }
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryHeaderMobile;
