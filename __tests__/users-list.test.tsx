import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsersList } from "@/app/ui/users-list";

// UsersList es un Server Component async: Vitest no puede renderizarlo
// directamente, así que lo llamamos como función, esperamos el JSX que
// devuelve y renderizamos ese resultado.
async function renderUsersList() {
  render(await UsersList());
}

function mockFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("UsersList", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  test("muestra los usuarios que devuelve el backend", async () => {
    mockFetch(
      Response.json([
        { id: 1, name: "Ada Lovelace", email: "ada@ejemplo.com", createdAt: "2026-01-01" },
        { id: 2, name: "Alan Turing", email: "alan@ejemplo.com", createdAt: "2026-01-02" },
      ]),
    );

    await renderUsersList();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Ada Lovelace")).toBeDefined();
    expect(screen.getByText("alan@ejemplo.com")).toBeDefined();
  });

  test("avisa cuando no hay usuarios", async () => {
    mockFetch(Response.json([]));

    await renderUsersList();

    expect(screen.getByText("Todavía no hay usuarios.")).toBeDefined();
  });

  test("muestra el error si el backend responde con un status de error", async () => {
    mockFetch(new Response(null, { status: 500 }));

    await renderUsersList();

    expect(screen.getByText(/respondió 500/)).toBeDefined();
  });

  test("usa API_URL para armar la URL del backend", async () => {
    vi.stubEnv("API_URL", "http://backend:8000");
    const fetchMock = mockFetch(Response.json([]));

    await renderUsersList();

    expect(fetchMock).toHaveBeenCalledWith("http://backend:8000/api/users");
  });
});
