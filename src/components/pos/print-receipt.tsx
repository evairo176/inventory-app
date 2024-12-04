"use client";
import React, { useRef, useState } from "react";
import { useMediaQuery, useMediaQueries } from "@react-hook/media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { formatToRupiah } from "@/utils/formatToRupiah";
import {
  getFormattedCurrentTime,
  getFormattedDate,
} from "@/utils/convert-to-iso-datetime";
import { Loader2, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { removeAllProductFromOrderLine } from "@/redux/slices/point-of-sale";
import { toast } from "sonner";
type PrintReceiptProps = {
  selectCustomer: string;
  createLineOrder: any;
  isSuccess: (value: any) => void;
};

const PrintReceipt = ({
  selectCustomer,
  createLineOrder,
  isSuccess,
}: PrintReceiptProps) => {
  const [open, setOpen] = React.useState(false);

  const orderLineItems = useAppSelector((state) => state?.pos?.products);
  const subTotal = orderLineItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const taxPercent = 10;
  const tax = (taxPercent * subTotal) / 100;
  const totalSum = subTotal + tax;
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: `SKD-${new Date().toDateString()}`,
    onAfterPrint: async () => {},
    pageStyle: `
    @page {
      size: auto; 
      width: 80mm; 
      height: 1000mm; 
      margin-top: 0cm; 
      margin-right: 0mm;
      margin-bottom: 0cm;
      margin-left: 0cm;
    }
    `,
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"secondary"} className="mt-2 w-full">
          Print Receipt
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="mx-auto  max-w-sm rounded-md border">
          <div className="max-h-screen">
            <div ref={contentRef}>
              <DrawerHeader>
                <DrawerTitle className="text-center">Stockify Shop</DrawerTitle>
                <DrawerDescription>
                  <div className="flex items-center justify-center space-x-2 border-b pb-2 text-primary">
                    <p className="text-xs">City: Kireka - kampala</p>
                    <p className="text-xs">Tel: +62 813 890 034 13</p>
                  </div>
                </DrawerDescription>
                <h1 className="text-center uppercase tracking-widest">
                  Receipt
                </h1>
                <div className="flex items-center justify-between space-x-2 border-b">
                  <p className="text-xs">Date: {getFormattedDate()}</p>
                  <p className="text-xs">Time: {getFormattedCurrentTime()}</p>
                </div>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderLineItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="max-w-36 truncate font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell className="text-right">
                          {formatToRupiah(item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell colSpan={2} className="text-right">
                        + {formatToRupiah(tax)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sub Total</TableCell>
                      <TableCell colSpan={2} className="text-right">
                        {formatToRupiah(subTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell colSpan={2} className="text-right">
                        {formatToRupiah(totalSum)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> <span>Print</span>
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default PrintReceipt;
