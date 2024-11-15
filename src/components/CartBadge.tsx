"use client";

import { useCart } from "@/contexts/CartContext";
import clsx from "clsx";
import { ShoppingCartIcon } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { useHoverDirty } from "react-use";

export function CartBadge(): JSX.Element {
  const pathname = usePathname();
  const { itemCounts } = useCart();

  const totalCount = useMemo(
    () =>
      [...itemCounts.values()].reduce<number>((acc, count) => acc + count, 0),
    [itemCounts],
  );

  const ref = useRef(null);

  const isHovering = useHoverDirty(ref);

  const containerClass = clsx("flex gap-4", {
    "cursor-pointer": totalCount > 0,
    hidden: pathname.startsWith("/cart"),
  });

  const textClass = clsx("transition-opacity", {
    "opacity-0": !isHovering || totalCount > 0,
  });

  const badgeClass = clsx(
    "absolute -right-4 -top-2 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white",
    {
      "opacity-0": totalCount === 0,
    },
  );

  const handleClick = () => {
    if (totalCount > 0) redirect("/cart");
  };

  return (
    <div className={containerClass} onClick={handleClick}>
      <div className={textClass}>Carrinho vazio</div>
      <div ref={ref} className="relative select-none">
        <div className={badgeClass}>{totalCount}</div>
        <ShoppingCartIcon />
      </div>
    </div>
  );
}
