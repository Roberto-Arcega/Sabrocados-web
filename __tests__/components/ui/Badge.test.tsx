import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import Badge from "@/app/components/Badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>Test Badge</Badge>);

    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Badge>Styled Badge</Badge>);

    const badge = screen.getByText("Styled Badge");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("gap-2");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("bg-surface");
    expect(badge).toHaveClass("px-4");
    expect(badge).toHaveClass("py-2");
    expect(badge).toHaveClass("text-sm");
    expect(badge).toHaveClass("text-text-secondary");
    expect(badge).toHaveClass("border");
    expect(badge).toHaveClass("border-border");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-badge">Custom</Badge>);

    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-badge");
  });

  it("renders with icon children", () => {
    render(
      <Badge>
        <svg data-testid="icon" />
        With Icon
      </Badge>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("is a span element", () => {
    render(<Badge>Span Badge</Badge>);

    const badge = screen.getByText("Span Badge");
    expect(badge.tagName).toBe("SPAN");
  });
});
