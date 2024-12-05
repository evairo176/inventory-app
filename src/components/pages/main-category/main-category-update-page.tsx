"use client";

import React from "react";
import { columns } from "./columns";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGetById } from "@/action/global-action";
import MainCategoriesForm from "@/components/dashboard/forms/main-category-form";

type Props = {
  id: string;
};

const MainCategoryUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/main-category`,
    id,
    "main-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <MainCategoriesForm editingId={id} initialCategory={data?.data} />;
};

export default MainCategoryUpdatePage;
