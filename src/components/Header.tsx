import { CartBadge } from "./CartBadge";
import { UserSettings } from "./UserSettings";
import Link from "next/link";

export function Header(): JSX.Element {
  return (
    <header className="flex justify-center bg-orange-100 px-8 py-2">
      <div className="flex max-w-screen-lg grow items-center justify-between">
        <Link className="text-xl font-bold" href="/">
          Coffee App
        </Link>
        <div className="flex items-center gap-8">
          <CartBadge />
          <UserSettings />
        </div>
      </div>
    </header>
  );
}
