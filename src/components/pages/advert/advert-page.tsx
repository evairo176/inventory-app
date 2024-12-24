"use client";

import React from "react";
import TableHeader from "../../dashboard/tables/table-header";
import DataTable from "../../datatable-columns/data-table";
import { columns } from "./columns";
import { useGet } from "@/action/global-action";

type Props = {};

const AdvertPage = (props: Props) => {
  const { data, error, isLoading } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/advert`,
    "advert",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 space-y-3">
      <TableHeader
        data={data.data}
        title="Advert"
        linkTitle="Add Advert"
        href="/dashboard/inventory/advert/new"
        queryKey="advert"
        createBulkPath={`${process.env.NEXT_PUBLIC_BACKEND_URL}/advert/bulk`}
      />
      <DataTable
        filterKeys={["title", "status"]}
        data={data.data}
        columns={columns}
      />
    </div>
  );
};

export default AdvertPage;
