"use client";

// import { useGetBrand } from "@/action/brand-action";
import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import CustomDatatable from "../../dashboard/tables/custom-datatable";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const CustomerPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer`,
    "customers",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      {data ? (
        <>
          <TableHeader
            data={data?.data}
            title="Customer"
            linkTitle="Add Customer"
            href="/dashboard/sales/customers/new"
            queryKey="customers"
            createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/bulk`}
          />
          <DataTable data={data?.data} columns={columns} />
        </>
      ) : (
        <>
          <div>Data not found</div>
        </>
      )}
    </div>
  );
};

export default CustomerPage;
