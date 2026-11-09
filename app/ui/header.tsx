import Link from "next/link";
import { NavLinks } from "@/app/ui/nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/[.08] bg-background/80 backdrop-blur dark:border-white/[.145]">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          devopt-test
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
