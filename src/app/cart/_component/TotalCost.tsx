"use client";

import { useCart } from "@/contexts/CartContext";
import { useCartProducts } from "@/contexts/CartProductsContext";
import clsx from "clsx";
import { useMemo } from "react";

type Props = {
  discountPercentage?: number;
};

export function TotalCost({ discountPercentage }: Props): JSX.Element {
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

  const discountedCost = useMemo(
    () => (totalCost * (100 - (discountPercentage ?? 0))) / 100,
    [discountPercentage, totalCost],
  );

  return (
    <div className="flex min-h-full flex-col rounded-xl bg-orange-100 p-4 font-bold">
      <div>Valor total</div>
      {discountedCost !== totalCost ? (
        <div>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(discountedCost)}
        </div>
      ) : null}
      <div
        className={clsx({
          "text-sm line-through opacity-50": discountedCost !== totalCost,
        })}
      >
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(totalCost)}
      </div>
    </div>
  );
}
