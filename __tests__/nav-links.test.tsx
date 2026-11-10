import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/app/ui/nav-links";

// usePathname necesita el router de Next; en los tests lo reemplazamos.
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

function activeLinkLabels() {
  const active = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("aria-current") === "page");
  return active.map((link) => link.textContent);
}

describe("NavLinks", () => {
  beforeEach(() => {
    mockedUsePathname.mockReset();
  });

  test("muestra los tres links de navegación", () => {
    mockedUsePathname.mockReturnValue("/");
    render(<NavLinks />);

    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/about",
      "/contact",
    ]);
  });

  test.each([
    ["/", "Home"],
    ["/about", "About"],
    ["/contact", "Contacto"],
  ])("en %s marca como activo a %s", (pathname, label) => {
    mockedUsePathname.mockReturnValue(pathname);
    render(<NavLinks />);

    expect(activeLinkLabels()).toEqual([label]);
  });

  test("una subruta mantiene activa a su sección, pero no a Home", () => {
    mockedUsePathname.mockReturnValue("/about/equipo");
    render(<NavLinks />);

    expect(activeLinkLabels()).toEqual(["About"]);
  });
});
