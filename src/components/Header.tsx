"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { CartBadge } from "./CartBadge";
import { UserSettings } from "./UserSettings";
import Link from "next/link";
import { Button } from "./Button";
import { useCallback } from "react";
import { LogInIcon } from "lucide-react";

export function Header(): JSX.Element {
  const { user, error, isLoading } = useUser();

  const handleLogin = useCallback(() => {
    window.location.href = "/api/auth/login";
  }, []);

  return (
    <header className="flex justify-center bg-orange-100 px-8 py-2">
      <div className="flex max-w-screen-lg grow items-center justify-between">
        <Link className="text-xl font-bold" href="/">
          Coffee App
        </Link>
        <div className="flex items-center gap-8">
          {!isLoading && !error && user == null ? (
            <Button onClick={handleLogin}>
              <LogInIcon />
              Fazer login
            </Button>
          ) : null}
          {user != null ? (
            <>
              <CartBadge />
              <UserSettings />
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
