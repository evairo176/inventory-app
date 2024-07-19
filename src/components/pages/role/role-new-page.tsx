"use client";

import React from "react";
import { useGet } from "@/action/global-action";
import RoleForm from "@/components/dashboard/forms/role-form";

type Props = {};

const RoleNewPage = () => {
  const {
    data: dataPermission,
    error: errorPermission,
    isLoading: isLoadingPermission,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/permission?role=true`,
    "permission",
  );

  if (errorPermission) return <div>failed to load</div>;
  if (isLoadingPermission) return <div>loading...</div>;

  return <RoleForm permissions={dataPermission?.data} />;
};

export default RoleNewPage;
