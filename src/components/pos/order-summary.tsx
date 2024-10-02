"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { Skeleton } from "../ui/skeleton";
import { formatToRupiah } from "@/utils/formatToRupiah";

type Props = {};

const OrderSummary = (props: Props) => {
  const orderLineItems = useAppSelector((state) => state?.pos?.products);
  const subTotal = orderLineItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const taxPercent = 10;
  const tax = (taxPercent * subTotal) / 100;
  const totalSum = subTotal + tax;
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
        <div className="animate-fadeIn w-full rounded-t-md border-t bg-white px-3 py-3 shadow-lg">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight text-muted-foreground first:mt-0">
            Order Summary
          </h2>
          <div className="space-y-2 border-b">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Items</p>
              <p className="font-medium">{orderLineItems.length} items</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">SubTotal</p>
              <p className="font-medium">{formatToRupiah(subTotal)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Tax</p>
              <p className="font-medium">
                {taxPercent}% - {`(${formatToRupiah(subTotal)})`}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <h2 className="scroll-m-20 pb-2 text-base font-semibold tracking-tight text-muted-foreground first:mt-0">
              Total
            </h2>
            <h2 className="scroll-m-20  pb-2 text-base font-semibold tracking-tight first:mt-0">
              {formatToRupiah(totalSum)}
            </h2>
          </div>
          <Button className="w-full">Place Order</Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OrderSummary;
