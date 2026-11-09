import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Somos un equipo dedicado a construir aplicaciones web modernas, rápidas
        y fáciles de mantener.
      </p>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Reemplazá este texto con la historia, la misión y los valores de tu
        proyecto.
      </p>
    </section>
  );
}
