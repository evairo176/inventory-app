"use client";
import { useGetCategory } from "@/action/category-action";
import TableHeader from "@/components/dashboard/tables/table-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { data, error, isLoading } = useGetCategory(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <TableHeader />
      Category
    </div>
  );
};

export default page;
