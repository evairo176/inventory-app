"use client";
import { useGetCategory } from "@/action/category-action";
import CustomDatatable from "@/components/dashboard/tables/custom-datatable";
import TableHeader from "@/components/dashboard/tables/table-header";

import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  const { data, error, isLoading } = useGetCategory(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  return (
    <div className="space-y-3">
      <TableHeader />
      <CustomDatatable categories={data.data} />
    </div>
  );
};

export default DashboardPage;
