"use client";

import React from "react";
import { useGet, useGetById } from "@/action/global-action";
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

  const {
    data: dataPermission,
    error: errorPermission,
    isLoading: isLoadingPermission,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission?role=true`,
    "permission",
  );

  if (error || errorPermission) return <div>failed to load</div>;
  if (isLoading || isLoadingPermission) return <div>loading...</div>;

  return (
    <RoleForm
      editingId={id}
      initialRole={data?.data}
      permissions={dataPermission?.data}
    />
  );
};

export default RoleUpdatePage;
