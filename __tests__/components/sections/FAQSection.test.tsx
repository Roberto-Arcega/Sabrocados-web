import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import FAQSection from "@/app/components/sections/FAQSection";

describe("FAQSection", () => {
  describe("Rendering", () => {
    it("renders the section heading", () => {
      render(<FAQSection />);

      expect(
        screen.getByRole("heading", { name: /preguntas frecuentes/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/todo lo que necesitas saber sobre sabrocados/i)
      ).toBeInTheDocument();
    });

    it("renders all FAQ questions", () => {
      render(<FAQSection />);

      expect(screen.getByText(/es apto para dieta keto/i)).toBeInTheDocument();
      expect(
        screen.getByText(/cuánto tiempo dura el producto/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/cómo debo conservarlo/i)).toBeInTheDocument();
      expect(screen.getByText(/contiene alérgenos/i)).toBeInTheDocument();
      expect(
        screen.getByText(/hacen envíos a todo méxico/i)
      ).toBeInTheDocument();
    });

    it("renders 5 FAQ items", () => {
      render(<FAQSection />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });

    it("has correct section id", () => {
      render(<FAQSection />);

      const section = screen.getByRole("heading", {
        name: /preguntas frecuentes/i,
      }).closest("section");
      expect(section).toHaveAttribute("id", "faq");
    });
  });

  describe("Accordion Interaction", () => {
    it("starts with all answers collapsed", () => {
      render(<FAQSection />);

      // Check that answer containers have max-h-0
      const ketoButton = screen.getByText(/es apto para dieta keto/i).closest("button");
      const answerContainer = ketoButton?.nextElementSibling;
      expect(answerContainer).toHaveClass("max-h-0");
    });

    it("expands answer when question is clicked", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const ketoButton = screen.getByText(/es apto para dieta keto/i).closest(
        "button"
      ) as HTMLElement;

      await user.click(ketoButton);

      const answerContainer = ketoButton.closest("button")?.nextElementSibling;
      expect(answerContainer).toHaveClass("max-h-96");
    });

    it("shows answer content when expanded", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const ketoButton = screen.getByText(/es apto para dieta keto/i).closest(
        "button"
      ) as HTMLElement;

      await user.click(ketoButton);

      expect(
        screen.getByText(/con solo 2g de carbohidratos por porción/i)
      ).toBeVisible();
    });

    it("collapses answer when clicked again", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const ketoButton = screen.getByText(/es apto para dieta keto/i).closest(
        "button"
      ) as HTMLElement;

      // Open
      await user.click(ketoButton);
      const answerContainer = ketoButton.closest("button")?.nextElementSibling;
      expect(answerContainer).toHaveClass("max-h-96");

      // Close
      await user.click(ketoButton);
      expect(answerContainer).toHaveClass("max-h-0");
    });

    it("closes previously open answer when another is clicked", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const ketoButton = screen.getByText(/es apto para dieta keto/i).closest(
        "button"
      ) as HTMLElement;
      const duracionButton = screen
        .getByText(/cuánto tiempo dura el producto/i)
        .closest("button") as HTMLElement;

      // Open first FAQ
      await user.click(ketoButton);
      const firstAnswer = ketoButton.nextElementSibling;
      expect(firstAnswer).toHaveClass("max-h-96");

      // Open second FAQ
      await user.click(duracionButton);

      // First should be closed now
      expect(firstAnswer).toHaveClass("max-h-0");
      // Second should be open
      expect(duracionButton.nextElementSibling).toHaveClass("max-h-96");
    });

    it("only allows one FAQ open at a time", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const buttons = screen.getAllByRole("button");

      // Click first button
      await user.click(buttons[0]);

      // Click second button
      await user.click(buttons[1]);

      // Count how many answers are expanded
      const expandedAnswers = buttons.filter((button) => {
        const answerContainer = button.nextElementSibling;
        return answerContainer?.classList.contains("max-h-96");
      });

      expect(expandedAnswers).toHaveLength(1);
    });
  });

  describe("Content Verification", () => {
    it("contains keto-related answer content", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      await user.click(
        screen.getByText(/es apto para dieta keto/i).closest("button")!
      );

      expect(screen.getByText(/2g de carbohidratos/i)).toBeInTheDocument();
      expect(screen.getByText(/dieta cetogénica/i)).toBeInTheDocument();
    });

    it("contains shelf life answer content", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      await user.click(
        screen.getByText(/cuánto tiempo dura el producto/i).closest("button")!
      );

      expect(screen.getByText(/6 meses sin abrir/i)).toBeInTheDocument();
      expect(screen.getByText(/2 semanas/i)).toBeInTheDocument();
    });

    it("contains shipping answer content", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      await user.click(
        screen.getByText(/hacen envíos a todo méxico/i).closest("button")!
      );

      expect(screen.getByText(/república mexicana/i)).toBeInTheDocument();
      expect(screen.getByText(/guanajuato/i)).toBeInTheDocument();
    });
  });

  describe("Visual Indicators", () => {
    it("rotates chevron icon when expanded", async () => {
      const user = userEvent.setup();
      render(<FAQSection />);

      const button = screen
        .getByText(/es apto para dieta keto/i)
        .closest("button") as HTMLElement;

      // Find the chevron container span inside the button
      const chevronContainer = button.querySelector("span.shrink-0");

      // Initially not rotated
      expect(chevronContainer).not.toHaveClass("rotate-180");

      await user.click(button);

      // After click, should be rotated
      expect(chevronContainer).toHaveClass("rotate-180");
    });
  });
});
