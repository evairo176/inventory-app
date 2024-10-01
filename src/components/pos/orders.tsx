"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import OrderItem from "./order-item";
import { useAppSelector } from "@/hooks/use-redux";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const Orders = (props: Props) => {
  const orderLineItems = useAppSelector((state) => state?.pos?.products);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex-1">
        <div className="space-y-4 px-3 py-2">
          {[1, 2, 3]?.map((row, key) => {
            return (
              <Skeleton className="h-[100px] w-full rounded-xl" key={key} />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <>
      {orderLineItems?.length > 0 ? (
        <ScrollArea className="flex-1">
          <div className="space-y-4 px-3 py-2 pr-3">
            {orderLineItems?.map((row) => {
              return <OrderItem item={row} key={row.id} />;
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <div className="flex-1 space-y-4 px-3 py-2">
          <h2>No order items</h2>
        </div>
      )}
    </>
  );
};

export default Orders;
