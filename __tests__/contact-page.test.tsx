import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

test("el email es un link mailto", () => {
  render(<ContactPage />);

  const link = screen.getByRole("link", { name: "hola@ejemplo.com" });
  expect(link.getAttribute("href")).toBe("mailto:hola@ejemplo.com");
});

test("el teléfono es un link tel", () => {
  render(<ContactPage />);

  const link = screen.getByRole("link", { name: "+54 11 0000-0000" });
  expect(link.getAttribute("href")).toBe("tel:+541100000000");
});

test("la dirección se muestra como texto, sin link", () => {
  render(<ContactPage />);

  const address = screen.getByText("Calle Falsa 123, Buenos Aires");
  expect(address.closest("a")).toBeNull();
});
