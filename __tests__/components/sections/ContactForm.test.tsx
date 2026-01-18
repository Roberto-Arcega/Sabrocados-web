import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/app/components/sections/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the form with all required fields", () => {
      render(<ContactForm />);

      expect(
        screen.getByRole("heading", { name: /contáctanos/i })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/cómo nos conociste/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/cantidad aproximada/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    });

    it("renders submit button with WhatsApp text", () => {
      render(<ContactForm />);

      expect(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      ).toBeInTheDocument();
    });

    it("renders the WhatsApp trust badge", () => {
      render(<ContactForm />);

      expect(
        screen.getByText(/respuesta rápida por whatsapp/i)
      ).toBeInTheDocument();
    });

    it("renders trust elements", () => {
      render(<ContactForm />);

      // Multiple elements match "Respuesta rápida", check at least one exists
      expect(screen.getAllByText(/respuesta rápida/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/envíos nacionales/i)).toBeInTheDocument();
      expect(screen.getByText(/pago seguro/i)).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("shows error when name is empty", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(
        await screen.findByText(/el nombre es requerido/i)
      ).toBeInTheDocument();
    });

    it("shows error when phone is empty", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(
        await screen.findByText(/el teléfono es requerido/i)
      ).toBeInTheDocument();
    });

    it("shows error for invalid phone format", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "12345");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(
        await screen.findByText(/teléfono válido de 10 dígitos/i)
      ).toBeInTheDocument();
    });

    // Email validation is tested in unit tests (lib/validation.test.ts)
    it.skip("shows error for invalid email format", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.type(screen.getByLabelText(/email/i), "notanemail");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(screen.getByText(/ingresa un email válido/i)).toBeInTheDocument();
    });

    it("clears error when user starts typing", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );
      expect(
        await screen.findByText(/el nombre es requerido/i)
      ).toBeInTheDocument();

      await user.type(screen.getByLabelText(/nombre completo/i), "J");

      expect(
        screen.queryByText(/el nombre es requerido/i)
      ).not.toBeInTheDocument();
    });

    it("accepts valid email", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.type(screen.getByLabelText(/email/i), "valid@email.com");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(
        screen.queryByText(/ingresa un email válido/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("opens WhatsApp with correct URL on valid submission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const mockOpen = vi.fn();
      vi.stubGlobal("open", mockOpen);

      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan Pérez");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      expect(mockOpen).toHaveBeenCalledTimes(1);
      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining("wa.me/524775775959"),
        "_blank"
      );
    });

    it("shows loading state during submission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(await screen.findByText(/enviando/i)).toBeInTheDocument();
    });

    it("shows success state after submission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      expect(
        await screen.findByText(/mensaje enviado/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/continúa la conversación en whatsapp/i)
      ).toBeInTheDocument();
    });

    it("resets form after success", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);
      await vi.advanceTimersByTimeAsync(3100);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre completo/i)).toHaveValue("");
      });
    });

    it("disables submit button during submission", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Source Options", () => {
    it("renders all source options in dropdown", () => {
      render(<ContactForm />);

      const select = screen.getByLabelText(/cómo nos conociste/i);
      expect(select).toBeInTheDocument();

      expect(
        screen.getByRole("option", { name: /selecciona una opción/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /instagram/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /facebook/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /recomendación/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /google/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: /otro/i })).toBeInTheDocument();
    });

    it("includes selected source in WhatsApp message", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const mockOpen = vi.fn();
      vi.stubGlobal("open", mockOpen);

      render(<ContactForm />);

      await user.type(screen.getByLabelText(/nombre completo/i), "Juan");
      await user.type(screen.getByLabelText(/teléfono/i), "1234567890");
      await user.selectOptions(
        screen.getByLabelText(/cómo nos conociste/i),
        "instagram"
      );
      await user.click(
        screen.getByRole("button", { name: /enviar por whatsapp/i })
      );

      await vi.advanceTimersByTimeAsync(600);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining("Instagram"),
        "_blank"
      );
    });
  });
});
