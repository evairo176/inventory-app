import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { IProduct } from "@/types/types";

type ItemProps = {
  item: IProduct;
};

const Item = ({ item }: ItemProps) => {
  return (
    <div className="rounded-md border bg-card p-2 text-card-foreground shadow-sm">
      <Image
        className="h-32 w-full rounded-md object-cover"
        src={item.productThumbnail as string}
        height={200}
        width={200}
        alt={"all"}
      />
      <h2 className="font-semibold">{item.name}</h2>
      <p className="line-clamp-2 text-xs">{item.productDetails}</p>
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-blue-600">$ {item.productPrice}</p>
        <Badge variant={"outline"} className="">
          {item.stockQty} items
        </Badge>
      </div>
      <Button className="w-full" size={"sm"} variant={"outline"}>
        <Plus className="mr-2 h-4 w-4" />
        <span>Add to Cart</span>
      </Button>
    </div>
  );
};

export default Item;
