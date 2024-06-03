"use client";
import * as React from "react";
import { SWRConfig } from "swr";

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};
interface props {
  children: React.ReactNode;
}
export const SWRConfigurationProvider = ({ children }: props) => (
  <SWRConfig value={swrConfig}>{children}</SWRConfig>
);
