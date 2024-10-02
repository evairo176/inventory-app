"use client";
import { useAppDispatch } from "@/hooks/use-redux";
import { decrementQty, incrementQty } from "@/redux/slices/point-of-sale";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type OrderItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    productThumbnail: string;
    qty: number;
  };
};

const OrderItem = ({ item }: OrderItemProps) => {
  const dispatch = useAppDispatch();

  const handleIncrementQty = (id: string) => {
    dispatch(incrementQty(id));
  };
  const handleDecrementQty = (id: string) => {
    dispatch(decrementQty(id));
  };
  return (
    <div className="animate-fadeIn flex w-full gap-2 rounded-md border bg-card p-2 text-card-foreground shadow-sm">
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
          <p className="text-sm text-blue-600">{formatToRupiah(item.price)}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecrementQty(item.id)}
              className="flex h-6 w-8 items-center justify-center  rounded-sm border bg-rose-800 text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-sm">{item.qty}</p>
            <button
              onClick={() => handleIncrementQty(item.id)}
              className="flex h-6 w-8 items-center justify-center  rounded-sm border"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
