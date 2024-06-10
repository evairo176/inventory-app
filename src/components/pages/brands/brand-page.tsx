"use client";

// import { useGetBrand } from "@/action/brand-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const BrandPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/brand`,
    "brands",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="space-y-3">
      <TableHeader
        title="Brands"
        linkTitle="Add Brand"
        href="/dashboard/inventory/brands/new"
      />
      <DataTable data={data.data} columns={columns} />
    </div>
  );
};

export default BrandPage;
