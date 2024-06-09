"use client";

import React from "react";
import { columns } from "./columns";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGetCategoryId } from "@/action/category-action";

type Props = {
  id: string;
};

const CategoryUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetCategoryId(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${id}`,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <CategoryForm editingId={id} initialCategory={data?.data} />;
};

export default CategoryUpdatePage;
