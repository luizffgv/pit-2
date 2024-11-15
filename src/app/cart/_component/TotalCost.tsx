"use client";

import { useCart } from "@/contexts/CartContext";
import { useCartProducts } from "@/contexts/CartProductsContext";
import { useMemo } from "react";

export function TotalCost(): JSX.Element {
  const { itemCounts } = useCart();
  const { products } = useCartProducts();

  const productsMap = useMemo(
    () =>
      new Map<number, number>(
        products.map((product) => [product.id, product.price]),
      ),
    [products],
  );

  const totalCost = useMemo(
    () =>
      [...itemCounts.entries()].reduce<number>(
        (acc, [id, count]) => acc + count * (productsMap.get(Number(id)) ?? 0),
        0,
      ),
    [itemCounts, productsMap],
  );

  return (
    <div className="flex min-h-full flex-col rounded-xl bg-orange-100 p-4 font-bold">
      <div>Valor total</div>
      <div>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(totalCost)}
      </div>
    </div>
  );
}
