"use client";

import React from "react";
import { useGetById } from "@/action/global-action";
import PermissionForm from "@/components/dashboard/forms/permission-form";

type Props = {
  id: string;
};

const PermissionUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission`,
    id,
    "permissions",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <PermissionForm editingId={id} initialPermission={data?.data} />;
};

export default PermissionUpdatePage;
