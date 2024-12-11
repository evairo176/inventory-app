"use client";

import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const MainCategoryPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/main-category`,
    "main-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      <TableHeader
        data={data.data}
        title="Main Category"
        linkTitle="Add Main Category"
        href="/dashboard/inventory/main-category/new"
        queryKey="main-category"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/main-category/bulk`}
      />
      <DataTable
        filterKeys={["title", "status"]}
        data={data.data}
        columns={columns}
      />
    </div>
  );
};

export default MainCategoryPage;
