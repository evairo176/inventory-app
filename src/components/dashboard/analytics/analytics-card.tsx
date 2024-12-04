import { useGet } from "@/action/global-action";
import AnalyticsCardItem from "./analytics-card-item";
import { SalesSummary } from "@/types/types";
import { CarTaxiFront, Check, Loader2Icon, Store, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsCard({}) {
  const {
    data: salesSummaryResponse,
    error,
    isLoading,
  } = useGet(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/analytic/sales`,
    "analytic-sales",
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <>
        {[1, 2, 3, 4, 5]?.map((row, key) => {
          return (
            <div className="flex flex-col space-y-3" key={key}>
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          );
        })}
      </>
    );

  const salesSummary: SalesSummary = salesSummaryResponse?.data?.salesSummary;
  // Convert the object to an array of objects with 'value' key
  const salesSummaryArray = Object.entries(salesSummary)
    .map(([key, value]) => ({
      value,
      name: key,
    }))
    ?.map((row) => {
      if (row.name === "totalOrders") {
        return {
          ...row,
          title: "Total Order",
          link: "/dashboard/sales/orders",
          color: "bg-orange-500",
          icon: Store,
        };
      }

      if (row.name === "orderFailed") {
        return {
          ...row,
          title: "Orders Failed",
          link: "/dashboard/sales",
          color: "bg-rose-500",
          icon: X,
        };
      }

      if (row.name === "orderPending") {
        return {
          ...row,
          title: "Orders Pending",
          link: "/dashboard/sales",
          color: "bg-sky-500",
          icon: Loader2Icon,
        };
      }

      if (row.name === "orderProcessing") {
        return {
          ...row,
          title: "Orders Processing",
          link: "/dashboard/sales",
          color: "bg-cyan-500",
          icon: CarTaxiFront,
        };
      }

      if (row.name === "orderDelivered") {
        return {
          ...row,
          title: "Orders Delivered",
          link: "/dashboard/sales",
          color: "bg-green-500",
          icon: Check,
        };
      }
      return {
        ...row,
        title: "",
        link: "",
        color: "",
        icon: null,
      };
    });

  return (
    <>
      {salesSummaryArray &&
        salesSummaryArray?.map((row) => {
          return (
            <AnalyticsCardItem
              key={row.name}
              title={row.title}
              value={row.value}
              icon={row.icon}
              colorClassName={row.color}
              href={row.link}
            />
          );
        })}
    </>
  );
}
