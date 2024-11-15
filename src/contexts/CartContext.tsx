"use client";

import { createContext, use, useCallback, useMemo, useState } from "react";

export type CartContext = {
  itemCounts: Map<string, number>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContext>({
  itemCounts: new Map(),
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function useCart(): CartContext {
  return use(CartContext);
}

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [itemCounts, setItemCounts] = useState(new Map<string, number>());

  const addItem = useCallback(
    (id: string) => {
      const newItemCounts = new Map(itemCounts);
      newItemCounts.set(id, (itemCounts.get(id) ?? 0) + 1);
      setItemCounts(newItemCounts);
    },
    [itemCounts],
  );

  const removeItem = useCallback(
    (id: string) => {
      const newItemCounts = new Map(itemCounts);
      const newCount = (itemCounts.get(id) ?? 1) - 1;
      if (newCount > 0) newItemCounts.set(id, newCount);
      else newItemCounts.delete(id);
      setItemCounts(newItemCounts);
    },
    [itemCounts],
  );

  const clearCart = useCallback(() => {
    const newItemCounts = new Map();
    setItemCounts(newItemCounts);
  }, [itemCounts]);

  const value = useMemo(
    () => ({
      itemCounts,
      addItem,
      removeItem,
      clearCart,
    }),
    [itemCounts, addItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
