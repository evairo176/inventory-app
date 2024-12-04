"use client";

import React from "react";
import { useGet, useGetById } from "@/action/global-action";
import CustomerForm from "@/components/dashboard/forms/customer-form";

type Props = {
  id: string;
};

const CustomerUpdatePage = ({ id }: Props) => {
  const { data, error, isLoading } = useGetById(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer`,
    id,
    "customers",
  );

  const {
    data: dataRole,
    error: errorRole,
    isLoading: isLoadingRole,
  } = useGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/role`, "roles");

  if (error || errorRole) return <div>failed to load</div>;
  if (isLoading || isLoadingRole) return <div>loading...</div>;

  return (
    <CustomerForm
      editingId={id}
      initialUser={data?.data}
      roles={dataRole?.data}
    />
  );
};

export default CustomerUpdatePage;
