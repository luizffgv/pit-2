import { REACT_QUERY_KEYS } from "@/constants/react-query";
import { Product } from "@/prisma";
import { createContext, use, useMemo } from "react";
import { useCart } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/products";

export type CartProductsContext = {
  isError: boolean;
  isLoading: boolean;
  products: Product[];
  refetch: () => void;
};

export const CartProductsContext = createContext<CartProductsContext>({
  isError: false,
  isLoading: true,
  products: [],
  refetch: () => {},
});

export function useCartProducts(): CartProductsContext {
  return use(CartProductsContext);
}

export function CartProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { itemCounts } = useCart();

  const itemIds = useMemo(
    () =>
      [...itemCounts.keys()]
        .map((id) => Number.parseInt(id))
        .sort((a, b) => a - b)
        .map(String),
    [itemCounts],
  );

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: REACT_QUERY_KEYS.fetchProducts(itemIds),
    queryFn: async () => await getProducts({ ids: itemIds }),
  });

  const value = useMemo(
    () => ({
      isError,
      isLoading,
      products: data ?? [],
      refetch,
    }),
    [data, isError, isLoading, refetch],
  );

  return (
    <CartProductsContext.Provider value={value}>
      {children}
    </CartProductsContext.Provider>
  );
}
