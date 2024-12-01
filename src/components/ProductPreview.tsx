"use client";

import {
  CoffeeIcon,
  EyeIcon,
  HeartIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from "lucide-react";
import { Product } from "@/prisma";
import { useCart } from "@/contexts/CartContext";
import { useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserFavorites } from "@/contexts/UserFavoritesContext";
import Link from "next/link";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const bottomButtonsCva = cva("flex", {
  variants: {
    isLoggedIn: {
      false: "invisible",
      true: "visible",
    },
  },
});

const favoriteButonCva = cva(
  "flex items-center gap-2 rounded-md rounded-l-none border-l-2 border-l-orange-950 px-4 py-2 transition ",
  {
    variants: {
      favorite: {
        true: clsx("bg-red-600 text-white"),
        false: clsx("bg-orange-200 text-red-600 hover:bg-orange-300"),
      },
    },
  },
);

type Props = {
  product: Product;
};

export function ProductPreview({ product }: Props): JSX.Element {
  const { addItem } = useCart();

  const { error: errorUser, isLoading: isLoadingUser, user } = useUser();

  const { favorite, favoriteProducts, unfavorite } = useUserFavorites();

  const handleAddToCart = useCallback(() => {
    addItem(String(product.id));
  }, [addItem, product.id]);

  const handleClickHeart = useCallback(async () => {
    if (favoriteProducts.has(product.id)) {
      unfavorite({ productId: product.id });
    } else {
      favorite({ productId: product.id });
    }
  }, [favoriteProducts, product.id]);

  if (isLoadingUser || errorUser) {
    return <></>;
  }

  return (
    <div className="flex w-64 flex-col justify-between gap-4 rounded-md border-4 border-red-950 bg-orange-100 shadow-md">
      <div className="flex flex-col gap-6 px-4 pt-4">
        <div className="flex justify-between gap-2">
          <div className="text-xl font-bold text-orange-950">
            {product.name}
          </div>
          <div className="flex gap-2">
            <SparklesIcon className="opacity-75" />
            <Link href={`/products/${product.id}`}>
              <EyeIcon className="opacity-75" />
            </Link>
          </div>
        </div>
        <div className="flex rotate-12 justify-center pb-8 text-orange-950 opacity-50">
          <CoffeeIcon size={64} />
        </div>
      </div>
      <div className="px-4">
        {product.description != null ? <div>{product.description}</div> : null}
      </div>
      <div className="flex items-center justify-between bg-orange-950 px-4 py-2">
        <div className="text-lg font-bold text-orange-100">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </div>
        <div className={bottomButtonsCva({ isLoggedIn: user != null })}>
          <button
            className="flex items-center gap-2 rounded-md rounded-r-none bg-orange-200 px-4 py-2 text-orange-950 transition hover:bg-orange-300"
            aria-label="Adicionar ao carrinho"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon
              className="mr-1 inline-block"
              size={16}
              strokeWidth={3}
            />
          </button>
          <button
            className={favoriteButonCva({
              favorite: favoriteProducts.has(product.id),
            })}
            aria-label="Adicionar aos favoritos"
            onClick={handleClickHeart}
          >
            <HeartIcon
              className="mr-1 inline-block [filter:drop-shadow(0_0_10px_white)]"
              size={16}
              strokeWidth={3}
              fill={favoriteProducts.has(product.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
