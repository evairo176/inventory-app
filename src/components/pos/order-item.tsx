import { Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type OrderItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    productThumbnail: string;
  };
};

const OrderItem = ({ item }: OrderItemProps) => {
  console.log({ item });
  return (
    <div className="flex w-full gap-2 rounded-md border bg-card p-2 text-card-foreground shadow-sm">
      <Image
        className="h-16 w-16 rounded-md object-cover"
        src={item.productThumbnail ?? "/placeholder.svg"}
        height={200}
        width={200}
        alt={item.name}
      />
      <div className="w-full">
        <h2 className="text-md font-semibold">{item.name}</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-blue-600">${item.price}</p>
          <div className="flex items-center gap-2">
            <button className="flex h-6 w-8 items-center justify-center  rounded-md border">
              <Plus className="h-4 w-4" />
            </button>
            <p>4</p>
            <button className="flex h-6 w-8 items-center justify-center  rounded-md border bg-slate-800 text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
