"use client";

import React from "react";

import { useGet, useGetById } from "@/action/global-action";

import SubCategoryForm from "@/components/dashboard/forms/sub-category-form";

type Props = {
  id: string;
};

const SubCategoryUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    id,
    "sub-category",
  );

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, "category");

  if (error || errorCategory) return <div>failed to load</div>;
  if (isLoading || isLoadingCategory) return <div>loading...</div>;

  return (
    <SubCategoryForm
      editingId={id}
      initialCategory={data?.data}
      category={dataCategory?.data}
    />
  );
};

export default SubCategoryUpdatePage;
