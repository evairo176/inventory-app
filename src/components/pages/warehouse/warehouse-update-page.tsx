"use client";

import React from "react";
import BrandForm from "@/components/dashboard/forms/brand-form";
import { useGetById } from "@/action/global-action";
import WarehouseForm from "@/components/dashboard/forms/warehouse-form";

type Props = {
  id: string;
};

const WarehouseUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/warehouse`,
    id,
    "warehouses",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <WarehouseForm editingId={id} initialWarehouse={data?.data} />;
};

export default WarehouseUpdatePage;
