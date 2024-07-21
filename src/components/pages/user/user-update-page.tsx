"use client";

import React from "react";
import { useGet, useGetById } from "@/action/global-action";
import UpdateUserForm from "@/components/dashboard/forms/update-user-form";

type Props = {
  id: string;
};

const UserUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
    id,
    "users",
  );

  const {
    data: dataRole,
    error: errorRole,
    isLoading: isLoadingRole,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/role`, "roles");

  if (error || errorRole) return <div>failed to load</div>;
  if (isLoading || isLoadingRole) return <div>loading...</div>;

  return (
    <UpdateUserForm
      editingId={id}
      initialUser={data?.data}
      roles={dataRole?.data}
    />
  );
};

export default UserUpdatePage;
