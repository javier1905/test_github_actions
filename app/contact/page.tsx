import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
};

const contactInfo = [
  { label: "Email", value: "hola@ejemplo.com", href: "mailto:hola@ejemplo.com" },
  { label: "Teléfono", value: "+54 11 0000-0000", href: "tel:+541100000000" },
  { label: "Dirección", value: "Calle Falsa 123, Buenos Aires" },
];

export default function ContactPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-semibold tracking-tight">Contacto</h1>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        ¿Tenés alguna pregunta? Escribinos por cualquiera de estos medios.
      </p>
      <dl className="grid gap-4 sm:grid-cols-3">
        {contactInfo.map(({ label, value, href }) => (
          <div
            key={label}
            className="rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]"
          >
            <dt className="text-sm text-zinc-500">{label}</dt>
            <dd className="mt-1 font-medium">
              {href ? (
                <a href={href} className="hover:underline">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
