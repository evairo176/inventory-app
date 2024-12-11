import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, ListFilter } from "lucide-react";
import TransactionsList from "../transactions-list";
import BarChartCard from "./bar-chart-card";
import OrderSummary from "../order-summary";

type Props = {};

const Analytics = (props: Props) => {
  return (
    <Tabs defaultValue="orders">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="sales">Recent Sales</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="orders">
        <OrderSummary />
      </TabsContent>
      <TabsContent value="sales">
        <h2>Month sales</h2>
      </TabsContent>
      <TabsContent value="year">
        <BarChartCard />
      </TabsContent>
    </Tabs>
  );
};

export default Analytics;
