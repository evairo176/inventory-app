"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { Skeleton } from "../ui/skeleton";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useCreate } from "@/action/global-action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeAllProductFromOrderLine } from "@/redux/slices/point-of-sale";

import PrintReceipt from "./print-receipt";

type OrderSummaryProps = {
  selectCustomer: string;
  categoryId: string;
};

const OrderSummary = ({ selectCustomer, categoryId }: OrderSummaryProps) => {
  const orderLineItems = useAppSelector((state) => state?.pos?.products);
  const subTotal = orderLineItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const taxPercent = 10;
  const tax = (taxPercent * subTotal) / 100;
  const totalSum = subTotal + tax;
  const [isClient, setIsClient] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, isSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const createLineOrder = useCreate(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/pos/create-line-order`,
    `pos-products-${categoryId}`,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateLineOrder = async () => {
    setProcessing(true);
    const customerData = {
      customerId: selectCustomer,
    };
    const orderItems = orderLineItems;

    const data = {
      customerData,
      orderItems,
    };

    let responsePromise: Promise<any>;
    responsePromise = createLineOrder.mutateAsync(data);

    toast.promise(responsePromise, {
      loading: "Loading...",
      success: (data: any) => {
        setProcessing(false);

        isSuccess(true);
        return `${data?.message}`;
      },
      error: (data: any) => {
        const error = data?.message ? JSON.parse(data?.message) : "Blank";
        setProcessing(false);
        isSuccess(false);
        return `${error?.error}`;
      },
    });
  };

  const clearOrder = () => {
    dispatch(removeAllProductFromOrderLine());
    isSuccess(false);
  };

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
        <div className="w-full animate-fadeIn rounded-t-md border-t bg-card px-3 py-3 shadow-lg">
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
          {processing ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <>
              {success && (
                <div className="space-y-2">
                  <PrintReceipt
                    selectCustomer={selectCustomer}
                    createLineOrder={createLineOrder}
                    isSuccess={isSuccess}
                  />
                  <Button
                    onClick={clearOrder}
                    className="w-full"
                    variant={"destructive"}
                  >
                    Clear All
                  </Button>
                </div>
              )}

              {!success && orderLineItems?.length > 0 && (
                <div className="space-y-2">
                  <Button onClick={handleCreateLineOrder} className="w-full">
                    Place Order
                  </Button>
                  <Button
                    onClick={clearOrder}
                    className="w-full"
                    variant={"destructive"}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default OrderSummary;
