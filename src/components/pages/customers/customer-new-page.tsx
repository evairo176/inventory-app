"use client";

import React from "react";
import { useGet } from "@/action/global-action";

import CustomerForm from "@/components/dashboard/forms/customer-form";

type Props = {};

const CustomerNewPage = () => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    "roles",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <CustomerForm roles={data?.data} />;
};

export default CustomerNewPage;
