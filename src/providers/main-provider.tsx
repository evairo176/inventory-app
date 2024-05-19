import React from "react";
import { ThemeProvider } from "./theme-provider";

interface MainProvidersProps {
  children: React.ReactNode;
}

const MainProviders = ({ children }: MainProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default MainProviders;
