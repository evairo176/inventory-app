"use client";

import React from "react";
import { useGet } from "@/action/global-action";
import UserForm from "@/components/dashboard/forms/user-form";

type Props = {};

const UserNewPage = () => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/role`,
    "roles",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <UserForm roles={data?.data} />;
};

export default UserNewPage;
