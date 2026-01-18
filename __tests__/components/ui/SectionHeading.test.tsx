import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import SectionHeading from "@/app/components/ui/SectionHeading";

describe("SectionHeading", () => {
  it("renders title correctly", () => {
    render(<SectionHeading title="Test Title" />);

    expect(
      screen.getByRole("heading", { name: "Test Title", level: 2 })
    ).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Title" subtitle="This is a subtitle" />);

    expect(screen.getByText("This is a subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<SectionHeading title="Only Title" />);

    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("is centered by default", () => {
    const { container } = render(<SectionHeading title="Centered" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("text-center");
  });

  it("is not centered when centered is false", () => {
    const { container } = render(
      <SectionHeading title="Left Aligned" centered={false} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toHaveClass("text-center");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionHeading title="Custom" className="custom-heading" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-heading");
  });

  it("applies correct title styles", () => {
    render(<SectionHeading title="Styled Title" />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-white");
  });

  it("applies correct subtitle styles", () => {
    render(<SectionHeading title="Title" subtitle="Styled Subtitle" />);

    const subtitle = screen.getByText("Styled Subtitle");
    expect(subtitle).toHaveClass("mt-4");
    expect(subtitle).toHaveClass("text-lg");
    expect(subtitle).toHaveClass("text-text-secondary");
    expect(subtitle).toHaveClass("max-w-2xl");
  });

  it("subtitle is in a p element", () => {
    render(<SectionHeading title="Title" subtitle="Paragraph subtitle" />);

    const subtitle = screen.getByText("Paragraph subtitle");
    expect(subtitle.tagName).toBe("P");
  });
});
