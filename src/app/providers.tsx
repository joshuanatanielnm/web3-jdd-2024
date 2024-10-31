"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/constants/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
