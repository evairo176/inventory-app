import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AnalyticsCardItemProps = {
  title: string;
  value: number;
  icon: any;
  colorClassName?: string;
  href: string;
};
export default function AnalyticsCardItem({
  title,
  value,
  icon,
  colorClassName,
  href,
}: AnalyticsCardItemProps) {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("rounded-full p-2", colorClassName)}>
          <Icon className="h-4 w-4 text-muted-foreground text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value ? value.toString().padStart(3, "0") : "-"}
        </div>
        <Link href={href}>
          <p className="mt-2 text-xs text-muted-foreground">View Details</p>
        </Link>
      </CardContent>
    </Card>
  );
}
