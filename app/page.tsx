import { Suspense } from "react";
import Link from "next/link";
import { io } from "next/cache";
import { UsersList } from "@/app/ui/users-list";

async function TestEnvValue() {
  // Excluye este valor del prerender: se lee de process.env en cada request,
  // no queda congelado con el valor que había al hacer el build.
  await io();
  const value = process.env.TEST;

  return <code className="font-mono">{value ?? "(no definida)"}</code>;
}

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-semibold tracking-tight">Bienvenido</h1>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Esta es la página de inicio. Usá la barra de navegación para conocer más
        sobre nosotros o ponerte en contacto. OOO
      </p>
      <p className="w-fit rounded-xl border border-black/[.08] px-4 py-3 dark:border-white/[.145]">
        <span className="text-zinc-500">TEST = </span>
        <Suspense fallback={<span className="text-zinc-500">cargando…</span>}>
          <TestEnvValue />
        </Suspense>
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/about"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Conocenos
        </Link>
        <Link
          href="/contact"
          className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-6 font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Contacto
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Usuarios del backend
        </h2>
        <Suspense
          fallback={<p className="text-zinc-500">Cargando usuarios…</p>}
        >
          <UsersList />
        </Suspense>
      </div>
    </section>
  );
}
