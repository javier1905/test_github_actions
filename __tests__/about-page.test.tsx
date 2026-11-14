import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage, { metadata } from "@/app/about/page";

test("muestra el título de la página", () => {
  render(<AboutPage />);

  expect(
    screen.getByRole("heading", { level: 1, name: "About" }),
  ).toBeDefined();
});

test("exporta el título para el <title> del documento", () => {
  expect(metadata.title).toBe("About");
});
