"use client";

import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const ProductPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    "products",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="space-y-3">
      <TableHeader
        data={data.data}
        title="Products"
        linkTitle="Add Product"
        href="/dashboard/inventory/products/new"
        queryKey="products"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/bulk`}
      />
      <DataTable
        filterKeys={["title", "status"]}
        data={data.data}
        columns={columns}
      />
    </div>
  );
};

export default ProductPage;
