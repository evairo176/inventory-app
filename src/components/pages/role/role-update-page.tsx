"use client";

import React from "react";
import { useGetById } from "@/action/global-action";
import RoleForm from "@/components/dashboard/forms/role-form";

type Props = {
  id: string;
};

const RoleUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    id,
    "roles",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <RoleForm editingId={id} initialRole={data?.data} />;
};

export default RoleUpdatePage;
