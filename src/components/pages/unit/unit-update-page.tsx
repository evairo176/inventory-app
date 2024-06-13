"use client";

import React from "react";
import UnitForm from "@/components/dashboard/forms/unit-form";
import { useGetById } from "@/action/global-action";

type Props = {
  id: string;
};

const UnitUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,
    id,
    "units",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <UnitForm editingId={id} initialUnit={data?.data} />;
};

export default UnitUpdatePage;
