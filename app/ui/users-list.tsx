import { unstable_rethrow } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

async function getUsers(url: string): Promise<User[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`respondió ${res.status}`);
  }
  return res.json();
}

export async function UsersList() {
  // En Docker, el frontend llega al backend por el nombre del servicio
  // (API_URL=http://backend:8000, en docker-compose.local.yml).
  // Con `pnpm dev` en tu Mac usa el puerto publicado del backend.
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  const url = `${apiUrl}/api/users`;

  let users: User[];
  try {
    users = await getUsers(url);
  } catch (error) {
    // Deja pasar los errores internos de Next (prerender, redirect, notFound).
    unstable_rethrow(error);
    const message = error instanceof Error ? error.message : String(error);
    return (
      <p className="text-red-600 dark:text-red-400">
        No se pudo cargar <code className="font-mono">{url}</code>: {message}
      </p>
    );
  }

  if (users.length === 0) {
    return <p className="text-zinc-500">Todavía no hay usuarios.</p>;
  }

  return (
    <ul className="divide-y divide-black/[.08] rounded-xl border border-black/[.08] dark:divide-white/[.145] dark:border-white/[.145]">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-medium">{user.name}</span>
          <span className="font-mono text-sm text-zinc-500">{user.email}</span>
        </li>
      ))}
    </ul>
  );
}
