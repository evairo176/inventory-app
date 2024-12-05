"use client";

import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const SubCategoryPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category`,
    "sub-category",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="space-y-3">
      <TableHeader
        data={data.data}
        title="Sub Category"
        linkTitle="Add Sub Category"
        href="/dashboard/inventory/sub-category/new"
        queryKey="sub-category"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-category/bulk`}
      />
      <DataTable
        filterKeys={["title", "status"]}
        data={data.data}
        columns={columns}
      />
    </div>
  );
};

export default SubCategoryPage;
