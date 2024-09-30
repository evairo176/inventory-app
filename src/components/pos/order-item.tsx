import { Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const OrderItem = (props: Props) => {
  return (
    <div className="flex rounded-md border bg-card p-2 text-card-foreground shadow-sm">
      <Image
        className="h-20 w-20 rounded-md object-cover"
        src={"/placeholder.svg"}
        height={200}
        width={200}
        alt={"all"}
      />
      <div className="ml-2">
        <h2 className="font-semibold">Grass Internal</h2>
        <p className="line-clamp-1 text-xs">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis hic
          necessitatibus quos provident neque! Quo, in aliquam hic officia nulla
          optio voluptatum? Nulla, amet excepturi recusandae quam cum voluptate
          quis.
        </p>
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-blue-600">$ 900</p>
          <div className="flex items-center space-x-3">
            <button className="flex h-7 w-10 items-center justify-center rounded-md border shadow">
              <Plus className="h-4 w-4" />
            </button>
            <p>4</p>
            <button className="flex h-7 w-10 items-center justify-center rounded-md border bg-slate-800 text-white shadow">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
