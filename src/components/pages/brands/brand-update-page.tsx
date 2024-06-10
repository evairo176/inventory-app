"use client";

import React from "react";
import CategoryForm from "@/components/dashboard/forms/category-form";
import { useGetBrandId } from "@/action/brand-action";
import BrandForm from "@/components/dashboard/forms/brand-form";

type Props = {
  id: string;
};

const BrandUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetBrandId(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/brand/${id}`,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <BrandForm editingId={id} initialBrand={data?.data} />;
};

export default BrandUpdatePage;
