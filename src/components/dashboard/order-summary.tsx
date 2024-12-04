import { useGet } from "@/action/global-action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "../ui/skeleton";
import { LineOrder } from "@/types/types";
import { getFormattedDate } from "@/utils/convert-to-iso-datetime";
import { formatHumanDate } from "@/utils/format";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { cn } from "@/lib/utils";

export default function OrderSummary() {
  const {
    data: ordersResponse,
    error,
    isLoading,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/pos/orders`,
    "analytic-orders",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <>
        {[1]?.map((row, key) => {
          return (
            <div className="flex flex-col space-y-3" key={key}>
              <Skeleton className="h-72 w-full rounded-xl" />
            </div>
          );
        })}
      </>
    );
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        {ordersResponse?.data?.lineOrder?.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersResponse?.data?.lineOrder?.map(
                  (row: LineOrder, index: number) => {
                    const isEven = index % 2 === 0;
                    return (
                      <TableRow
                        key={row.id}
                        className={cn(isEven && "bg-accent")}
                      >
                        <TableCell>
                          <div className="font-medium">{row.customerName}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {row.customerEmail}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {row.orderType}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatHumanDate(new Date(row.createdAt))}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatToRupiah(row.orderAmount)}
                        </TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">No Orders found</div>
        )}
      </CardContent>
    </Card>
  );
}
