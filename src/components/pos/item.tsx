import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, ShoppingBag, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { IProduct } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addProductToOrderLine,
  removeProductFromOrderLine,
} from "@/redux/slices/point-of-sale";
import { toast } from "sonner";

type ItemProps = {
  item: IProduct;
};

const Item = ({ item }: ItemProps) => {
  const [existing, setExisting] = useState(false);
  const orderLineItems = useAppSelector((state) => state?.pos?.products);

  useEffect(() => {
    // Check if the product already exists in the cart
    const isExisting = orderLineItems.some((product) => product.id === item.id);
    setExisting(isExisting);
  }, [orderLineItems, item.id]);

  const dispatch = useAppDispatch();
  function handleAdd() {
    const newOrderLineItem = {
      id: item.id,
      name: item.name,
      price: item.productPrice,
      productThumbnail: item.productThumbnail,
    };
    dispatch(addProductToOrderLine(newOrderLineItem));
    localStorage.setItem(
      "posItems",
      JSON.stringify([...orderLineItems, newOrderLineItem]),
    );

    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ message: "Item added successfully" }), 600),
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: (data: any) => {
        return `${data?.message}`;
      },
      error: (data: any) => {
        return `${data?.message}`;
      },
    });
  }

  const handleRemove = (productId: string) => {
    dispatch(removeProductFromOrderLine(productId));
    localStorage.setItem(
      "posItems",
      JSON.stringify(
        orderLineItems.filter((product) => product.id !== productId),
      ),
    );

    const promise = () =>
      new Promise((resolve, error) =>
        setTimeout(() => error({ message: "Item deleted successfully" }), 600),
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: (data: any) => {
        return `${data?.message}`;
      },
      error: (data: any) => {
        return `${data?.message}`;
      },
    });
  };
  return (
    <div className="rounded-md border bg-card p-2 text-card-foreground shadow-sm">
      <Image
        className="h-32 w-full rounded-md object-cover"
        src={item.productThumbnail as string}
        height={200}
        width={200}
        alt={item.name}
      />
      <h2 className="font-semibold">{item.name}</h2>
      <p className="line-clamp-2 text-xs">{item.productDetails}</p>
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-blue-600">$ {item.productPrice}</p>
        <Badge variant={"outline"} className="">
          {item.stockQty} items
        </Badge>
      </div>

      {existing ? (
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={() => handleRemove(item.id)}
        >
          <X className="mr-2 h-4 w-4" />
          <span>Remove Item</span>
        </Button>
      ) : (
        <Button className="w-full" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add to Order Line</span>
        </Button>
      )}
    </div>
  );
};

export default Item;
