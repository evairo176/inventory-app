"use client";

import React from "react";

import { useGet } from "@/action/global-action";

import SubCategoryForm from "@/components/dashboard/forms/sub-category-form";

type Props = {};

const SubCategoryNewPage = ({}: Props) => {
  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, "category");

  if (errorCategory) return <div>failed to load</div>;
  if (isLoadingCategory) return <div>loading...</div>;

  return <SubCategoryForm category={dataCategory?.data} />;
};

export default SubCategoryNewPage;
