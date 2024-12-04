import React from "react";

export default function DateColumn({
  row,
  accessorKey,
  object = false,
}: {
  row: any;
  accessorKey: any;
  object?: boolean;
}) {
  const createdAt = object
    ? row[`${accessorKey}`]
    : row.getValue(`${accessorKey}`);
  const originalDate = new Date(createdAt);

  const day = originalDate.getDate();
  const month = originalDate.toLocaleString("default", { month: "short" });
  const year = originalDate.getFullYear();

  const formatted = `${day}th ${month} ${year}`;
  // console.log(imageUrl);
  return <div className="">{formatted}</div>;
}
