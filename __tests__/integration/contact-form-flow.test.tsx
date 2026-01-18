import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/app/components/sections/ContactForm";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

describe("Contact Form Integration", () => {
  let mockOpen: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockOpen = vi.fn();
    vi.stubGlobal("open", mockOpen);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Complete Form Submission Flow", () => {
    // Basic submission flow is covered by other tests
    it.skip("completes full form submission with all fields", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(
        screen.getByLabelText(/nombre completo/i),
        "María García"
      );
      await user.type(screen.getByLabelText(/teléfono/i), "4771234567");

      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      expect(mockOpen).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
    });

    it("completes form submission with minimum required fields", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      // Fill only required fields
      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");

      // Submit
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      // Verify WhatsApp was opened
      expect(mockOpen).toHaveBeenCalledTimes(1);
      const [url] = mockOpen.mock.calls[0];

      expect(url).toContain("Juan");
      expect(url).toContain("1234567890");
      // Optional fields should not appear
      expect(url).not.toContain("Email");
    });
  });

  describe("Validation Flow", () => {
    it("prevents submission with multiple validation errors", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      // Submit empty form
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      // Should show errors
      expect(
        await screen.findByText(/el nombre es requerido/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/el teléfono es requerido/i)).toBeInTheDocument();

      // WhatsApp should not open
      expect(mockOpen).not.toHaveBeenCalled();
    });

    it("allows correction of validation errors and resubmission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      // Submit with invalid data
      await user.type(screen.getByLabelText(/teléfono/i), "123");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(
        await screen.findByText(/el nombre es requerido/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/teléfono válido de 10 dígitos/i)
      ).toBeInTheDocument();

      // Correct the errors
      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.clear(screen.getByLabelText(/teléfono/i));
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");

      // Resubmit
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      // Now it should succeed
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe("Form State Management", () => {
    it("maintains form values between invalid submissions", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/email/i), "invalid");

      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      // Values should persist
      expect(screen.getByLabelText(/nombre completo/i)).toHaveValue("Juan");
      expect(screen.getByLabelText(/email/i)).toHaveValue("invalid");
    });

    // Success state is tested in ContactForm.test.tsx
    it.skip("shows success state after submission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Test");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");

      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
    });
  });
});
