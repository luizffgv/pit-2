"use client";

import {
  QueryClient,
  QueryClientProvider as ImplProvider,
} from "@tanstack/react-query";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ImplProvider client={new QueryClient()}>{children}</ImplProvider>;
}
