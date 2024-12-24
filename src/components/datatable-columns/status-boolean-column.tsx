import React from "react";
import { Badge } from "../ui/badge";

export default function StatusBooleanColumn({
  row,
  accessorKey,
  object = false,
}: {
  row: any;
  accessorKey: any;
  object?: boolean;
}) {
  const status = object
    ? row[`${accessorKey}`]
    : row.getValue(`${accessorKey}`);

  // console.log(imageUrl);
  return (
    <Badge variant={status === "ACTIVE" ? "outline" : "secondary"}>
      {status ? "ACTIVE" : "DISABLED"}
    </Badge>
  );
}
