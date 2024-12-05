"use client";

import React from "react";

import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGet, useGetById } from "@/action/global-action";

const CategoryNewPage = ({}) => {
  const {
    data: dataMainCategory,
    error: errorMainCategory,
    isLoading: isLoadingMainCategory,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/main-category`,
    "main-category",
  );

  if (errorMainCategory) return <div>failed to load</div>;
  if (isLoadingMainCategory) return <div>loading...</div>;

  return <CategoryForm mainCategory={dataMainCategory?.data} />;
};

export default CategoryNewPage;
