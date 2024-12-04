"use client";
import React from "react";
import Analytics from "./analytics/analytics";
import AnalyticsCard from "./analytics/analytics-card";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="mb-2 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-5">
        <AnalyticsCard />
      </div>
      <Analytics />
    </div>
  );
};

export default Dashboard;
