import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import TestimonialsSection from "@/app/components/sections/TestimonialsSection";

describe("TestimonialsSection", () => {
  describe("Rendering", () => {
    it("renders the section heading", () => {
      render(<TestimonialsSection />);

      expect(
        screen.getByRole("heading", { name: /lo que dicen nuestros clientes/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/historias reales de personas/i)
      ).toBeInTheDocument();
    });

    it("renders all testimonial cards", () => {
      render(<TestimonialsSection />);

      expect(screen.getByText("Carlos M.")).toBeInTheDocument();
      expect(screen.getByText("Ana García")).toBeInTheDocument();
      expect(screen.getByText("Roberto S.")).toBeInTheDocument();
      expect(screen.getByText("María López")).toBeInTheDocument();
    });

    it("renders 4 testimonial cards", () => {
      render(<TestimonialsSection />);

      const testimonialNames = ["Carlos M.", "Ana García", "Roberto S.", "María López"];
      testimonialNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it("renders customer locations", () => {
      render(<TestimonialsSection />);

      expect(screen.getByText("León, GTO")).toBeInTheDocument();
      expect(screen.getByText("CDMX")).toBeInTheDocument();
      expect(screen.getByText("Querétaro")).toBeInTheDocument();
      expect(screen.getByText("Guadalajara")).toBeInTheDocument();
    });
  });

  describe("Testimonial Content", () => {
    it("renders testimonial text content", () => {
      render(<TestimonialsSection />);

      expect(
        screen.getByText(/lo probé en una reunión/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/perfecto para mis viajes/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/mi snack favorito para después del gym/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/el toque de limón/i)
      ).toBeInTheDocument();
    });

    it("wraps testimonial text in quotes", () => {
      render(<TestimonialsSection />);

      // The quotes are rendered as special quote characters
      // Check for testimonial text wrapped in quotes
      const testimonialTexts = screen.getAllByText(/^[\u201C\u201D"]/);
      expect(testimonialTexts.length).toBeGreaterThan(0);
    });
  });

  describe("Star Ratings", () => {
    it("renders star ratings for each testimonial", () => {
      render(<TestimonialsSection />);

      // Each testimonial has 5 stars, and there are 4 testimonials
      const stars = document.querySelectorAll("svg.text-amber-400");
      expect(stars.length).toBe(20); // 4 testimonials × 5 stars
    });

    it("renders filled stars with correct color", () => {
      render(<TestimonialsSection />);

      const filledStars = document.querySelectorAll(".text-amber-400");
      expect(filledStars.length).toBeGreaterThan(0);

      filledStars.forEach((star) => {
        expect(star).toHaveClass("text-amber-400");
      });
    });
  });

  describe("Avatar Display", () => {
    it("shows initials in avatar", () => {
      render(<TestimonialsSection />);

      // Each card shows the first letter of the name
      const avatars = document.querySelectorAll(
        ".bg-gradient-to-br.from-primary"
      );
      expect(avatars.length).toBe(4);
    });

    it("displays correct initial for each testimonial", () => {
      render(<TestimonialsSection />);

      const cards = document.querySelectorAll(".glass.rounded-2xl");

      // First testimonial - Carlos M. - should show "C"
      const firstAvatar = cards[0].querySelector(
        ".bg-gradient-to-br.from-primary"
      );
      expect(firstAvatar?.textContent).toBe("C");
    });
  });

  describe("Styling", () => {
    it("applies glass card styling", () => {
      render(<TestimonialsSection />);

      const cards = document.querySelectorAll(".glass.rounded-2xl.p-6");
      expect(cards.length).toBe(4);
    });

    it("has correct background for section", () => {
      render(<TestimonialsSection />);

      const section = screen
        .getByRole("heading", { name: /lo que dicen nuestros clientes/i })
        .closest("section");
      expect(section).toHaveClass("bg-surface/30");
    });
  });
});
