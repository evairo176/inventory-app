import Image from "next/image";
import React from "react";

export default function ImageColumn({
  row,
  accessorKey,
  index = false,
  object = false,
}: {
  row: any;
  accessorKey: any;
  index?: boolean;
  object?: boolean;
}) {
  const imageUrl = object
    ? row[`${accessorKey}`]
    : row.getValue(`${accessorKey}`);

  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <Image
        src={imageUrl ? imageUrl : "/placeholder.svg"}
        width={500}
        height={500}
        alt={`${accessorKey}`}
        className="h-12 w-16 rounded-md object-cover"
      />
    </div>
  );
}
