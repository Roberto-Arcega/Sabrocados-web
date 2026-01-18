import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import Button from "@/app/components/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-white");
  });

  it("applies ghost variant styles", () => {
    render(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-text-secondary");
    expect(button).not.toHaveClass("bg-primary");
  });

  it("applies outline variant styles", () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("border-border");
  });

  it("applies small size styles", () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-4");
    expect(button).toHaveClass("py-2");
    expect(button).toHaveClass("text-sm");
  });

  it("applies medium size styles by default", () => {
    render(<Button>Medium</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("text-base");
  });

  it("applies large size styles", () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("py-4");
    expect(button).toHaveClass("text-lg");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("passes through additional button props", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("handles onClick events", async () => {
    const handleClick = vi.fn();
    const { userEvent } = await import("@/test/test-utils");
    render(<Button onClick={handleClick}>Clickable</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct base styles", () => {
    render(<Button>Base</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");
    expect(button).toHaveClass("font-medium");
    expect(button).toHaveClass("rounded-full");
  });
});
