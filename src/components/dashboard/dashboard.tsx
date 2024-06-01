import React from "react";
import { Button } from "../ui/button";
import AnalyticsCard from "./analytics/analytics-card";
import TransactionsList from "./transactions-list";
import Analytics from "./analytics/analytics";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
      </div>
      <Analytics />
      <div className="grid grid-cols-1 gap-4 md:gap-8">
        <TransactionsList />
      </div>
    </div>
  );
};

export default Dashboard;
