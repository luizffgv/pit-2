"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { LogInIcon, LogOutIcon, ScrollIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useClickAway } from "react-use";

export function UserSettings() {
  const { user, error, isLoading } = useUser();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsMenuExpanded(false);
  });

  const handleExpand = useCallback(() => {
    setIsMenuExpanded(true);
  }, []);

  const handleClearStorage = useCallback(() => {
    for (const key of Object.keys(localStorage).filter((key) =>
      key.startsWith("user-"),
    ))
      localStorage.removeItem(key);
  }, []);

  if (error || isLoading) {
    return null;
  }

  const isLoggedIn = user != null;

  return (
    <div className="relative" ref={ref}>
      {isLoggedIn ? (
        <div
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-stone-50"
          onClick={handleExpand}
        >
          <UserRound />
        </div>
      ) : (
        <Link
          className="group relative block h-12 w-12 overflow-hidden rounded-full bg-stone-50"
          href="/api/auth/login"
        >
          <UserRound className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:-left-1/2 group-hover:-top-1/2" />
          <LogInIcon className="absolute left-[150%] top-[150%] -translate-x-1/2 -translate-y-1/2 transition-all group-hover:left-1/2 group-hover:top-1/2" />
        </Link>
      )}
      {isLoggedIn && isMenuExpanded ? (
        <div className="absolute -bottom-4 right-0 z-10 flex w-64 translate-y-full flex-col gap-4 rounded-md border-4 border-orange-950 bg-orange-100 p-4 shadow-sm">
          {user.name != null ? (
            <div>Olá, {user.name.split(" ")[0]}!</div>
          ) : null}
          <Link
            className="flex justify-between gap-2 font-bold"
            href="/order-history"
          >
            <span>Histórico de pedidos</span>
            <ScrollIcon />
          </Link>
          <Link
            className="flex justify-between gap-2 font-bold"
            href="/api/auth/logout"
            onClick={handleClearStorage}
          >
            <span>Sair da conta</span>
            <LogOutIcon />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
