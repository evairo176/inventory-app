"use client";

import React from "react";
import { columns } from "./columns";
import AdvertForm from "@/components/dashboard/forms/advert-form";
import { useGet, useGetById } from "@/action/global-action";

type Props = {
  id: string;
};

const AdvertUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advert`,
    id,
    "advert",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <AdvertForm editingId={id} initialAdvert={data?.data} />;
};

export default AdvertUpdatePage;
