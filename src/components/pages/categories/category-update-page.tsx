"use client";

import React from "react";
import { columns } from "./columns";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGet, useGetById } from "@/action/global-action";

type Props = {
  id: string;
};

const CategoryUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    id,
    "category",
  );

  const {
    data: dataMainCategory,
    error: errorMainCategory,
    isLoading: isLoadingMainCategory,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/main-category`,
    "main-category",
  );

  if (error || errorMainCategory) return <div>failed to load</div>;
  if (isLoading || isLoadingMainCategory) return <div>loading...</div>;

  return (
    <CategoryForm
      editingId={id}
      initialCategory={data?.data}
      mainCategory={dataMainCategory?.data}
    />
  );
};

export default CategoryUpdatePage;
