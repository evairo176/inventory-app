"use client";

import React from "react";
import BrandForm from "@/components/dashboard/forms/brand-form";
import { useGetById } from "@/action/global-action";

type Props = {
  id: string;
};

const BrandUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`,
    id,
    "brands",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <BrandForm editingId={id} initialBrand={data?.data} />;
};

export default BrandUpdatePage;
