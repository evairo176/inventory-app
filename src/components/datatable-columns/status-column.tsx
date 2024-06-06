import React from "react";
import { Badge } from "../ui/badge";

export default function StatusColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const status = row.getValue(`${accessorKey}`);

  // console.log(imageUrl);
  return (
    <Badge variant={status === "ACTIVE" ? "outline" : "secondary"}>
      {status}
    </Badge>
  );
}
