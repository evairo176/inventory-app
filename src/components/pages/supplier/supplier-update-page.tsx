"use client";

import React from "react";
import { useGetById } from "@/action/global-action";
import SupplierForm from "@/components/dashboard/forms/supplier-form";

type Props = {
  id: string;
};

const SupplierUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/supplier`,
    id,
    "suppliers",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <SupplierForm editingId={id} initialSupplier={data?.data} />;
};

export default SupplierUpdatePage;
