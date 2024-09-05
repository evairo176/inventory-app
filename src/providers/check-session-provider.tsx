"use client";

import useSessionExpiry from "@/hooks/use-session-expiry";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CheckSessionProvider = ({ children }: Props) => {
  useSessionExpiry();
  return <div>{children}</div>;
};

export default CheckSessionProvider;
