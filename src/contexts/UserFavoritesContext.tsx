"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, use, useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";

export type UserFavoritesContext = {
  favoriteProducts: Set<number>;
  favorite(params: { productId: number }): void;
  unfavorite(params: { productId: number }): void;
};

export const UserFavoritesContext = createContext<UserFavoritesContext>({
  favoriteProducts: new Set(),
  favorite() {},
  unfavorite() {},
});

export function useUserFavorites(): UserFavoritesContext {
  return use(UserFavoritesContext);
}

export function UserFavoritesContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user } = useUser();

  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "user-favorites",
    [],
  );

  const handleFavorite = useCallback(
    ({ productId }: { productId: number }) => {
      if (user == null) return;

      setFavoriteIds([...(favoriteIds ?? []), productId]);
    },
    [favoriteIds, setFavoriteIds, user],
  );

  const handleUnfavorite = useCallback(
    ({ productId }: { productId: number }) => {
      if (user == null) return;

      setFavoriteIds((favoriteIds ?? []).filter((id) => id !== productId));
    },
    [favoriteIds, setFavoriteIds, user],
  );

  const value = useMemo(() => {
    return {
      favoriteProducts: new Set(favoriteIds ?? []),
      favorite: handleFavorite,
      unfavorite: handleUnfavorite,
    };
  }, [favoriteIds, handleFavorite, handleUnfavorite]);

  return (
    <UserFavoritesContext.Provider value={value}>
      {children}
    </UserFavoritesContext.Provider>
  );
}
