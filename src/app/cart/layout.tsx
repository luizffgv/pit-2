"use client";

import { CartProductsContextProvider } from "@/contexts/CartProductsContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <CartProductsContextProvider>{children}</CartProductsContextProvider>;
}
