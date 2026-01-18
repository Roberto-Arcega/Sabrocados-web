import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import Header from "@/app/components/Header";

describe("Header", () => {
  describe("Rendering", () => {
    it("renders the logo", () => {
      render(<Header />);

      const logo = screen.getByAltText("Sabrocados");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/sabrocados-logo.png");
    });

    it("renders all navigation links on desktop", () => {
      render(<Header />);

      // Links appear twice (desktop and mobile), so check for at least one
      expect(screen.getAllByRole("link", { name: /home/i }).length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /productos/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /nutrición/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /experiencias/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /contacto/i }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it("renders mobile menu button", () => {
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /toggle menu/i })
      ).toBeInTheDocument();
    });

    it("has correct nav link hrefs", () => {
      render(<Header />);

      // Get the first of each link (desktop nav)
      const homeLinks = screen.getAllByRole("link", { name: /home/i });
      const productosLinks = screen.getAllByRole("link", { name: /productos/i });
      const nutricionLinks = screen.getAllByRole("link", { name: /nutrición/i });
      const experienciasLinks = screen.getAllByRole("link", { name: /experiencias/i });
      const contactoLinks = screen.getAllByRole("link", { name: /contacto/i });

      expect(homeLinks[0]).toHaveAttribute("href", "#");
      expect(productosLinks[0]).toHaveAttribute("href", "#productos");
      expect(nutricionLinks[0]).toHaveAttribute("href", "#nutricion");
      expect(experienciasLinks[0]).toHaveAttribute("href", "#experiencias");
      expect(contactoLinks[0]).toHaveAttribute("href", "#contacto");
    });
  });

  describe("Mobile Menu Interaction", () => {
    it("opens mobile menu when button is clicked", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Initially closed (max-h-0)
      const mobileMenuContainer = menuButton.closest("header")?.querySelector('[class*="max-h-"]');
      expect(mobileMenuContainer).toHaveClass("max-h-0");

      await user.click(menuButton);

      // After click, should be open
      expect(mobileMenuContainer).toHaveClass("max-h-[400px]");
    });

    it("closes mobile menu when button is clicked again", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      const mobileMenuContainer = menuButton.closest("header")?.querySelector('[class*="max-h-"]');

      // Open menu
      await user.click(menuButton);
      expect(mobileMenuContainer).toHaveClass("max-h-[400px]");

      // Close menu
      await user.click(menuButton);
      expect(mobileMenuContainer).toHaveClass("max-h-0");
    });

    it("closes mobile menu when a link is clicked", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Open menu
      await user.click(menuButton);

      // Find links in mobile menu (they appear twice - desktop and mobile)
      const allProductosLinks = screen.getAllByRole("link", {
        name: /productos/i,
      });
      const mobileLink = allProductosLinks[1]; // Second one is mobile

      await user.click(mobileLink);

      const mobileMenuContainer = menuButton.closest("header")?.querySelector('[class*="max-h-"]');
      expect(mobileMenuContainer).toHaveClass("max-h-0");
    });
  });

  describe("Active Link State", () => {
    it("shows Home link as active", () => {
      render(<Header />);

      // Find the desktop nav
      const desktopNav = screen.getByRole("navigation");
      const homeLink = within(desktopNav).getByRole("link", { name: /home/i });

      expect(homeLink).toHaveClass("text-emerald-400");
    });

    it("shows non-active links with neutral color", () => {
      render(<Header />);

      const desktopNav = screen.getByRole("navigation");
      const productosLink = within(desktopNav).getByRole("link", {
        name: /productos/i,
      });

      expect(productosLink).toHaveClass("text-neutral-400");
    });
  });

  describe("Accessibility", () => {
    it("has accessible menu button", () => {
      render(<Header />);

      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(menuButton).toHaveAttribute("aria-label", "Toggle menu");
    });

    it("renders as header element", () => {
      render(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("has navigation landmark", () => {
      render(<Header />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
