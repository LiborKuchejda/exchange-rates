import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyConverter } from "./CurrencyConverter";
import type { Rate } from "../api/gen/models";

// Mock the useDailyRates hook
vi.mock("../hooksAndUtils/useDailyRates", () => ({
  useDailyRates: vi.fn(),
}));

import { useDailyRates } from "../hooksAndUtils/useDailyRates";

const mockRates: Rate[] = [
  { country: "USA", currency: "dollar", amount: 1, currencyCode: "USD", rate: 23.456 },
  { country: "Japan", currency: "yen", amount: 100, currencyCode: "JPY", rate: 13.68 },
  { country: "EMU", currency: "euro", amount: 1, currencyCode: "EUR", rate: 25.0 },
];

describe("CurrencyConverter", () => {
  it("converts foreign currency to CZK in real-time when entering foreign amount", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignInput = screen.getByLabelText("Foreign amount");
    const czkInput = screen.getByLabelText("CZK amount");

    // Default is foreign source with amount "1" and EUR selected
    // EUR is in mockRates with rate 25.0, amount 1. toCzk(1, EUR) = (1*25)/1 = 25
    expect(czkInput).toHaveValue("25.000");

    await user.clear(foreignInput);
    await user.type(foreignInput, "2");
    // 2 EUR -> 50 CZK
    expect(czkInput).toHaveValue("50.000");
  });

  it("converts CZK to foreign currency when entering CZK amount", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignInput = screen.getByLabelText("Foreign amount");
    const czkInput = screen.getByLabelText("CZK amount");

    await user.clear(czkInput);
    await user.type(czkInput, "50");
    // 50 CZK in EUR (rate 25.0, amount 1): toForeign(50, EUR) = (50*1)/25 = 2
    expect(foreignInput).toHaveValue("2.000");
  });

  it("updates conversion when changing currency", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignSelect = screen.getByLabelText("Foreign currency");
    const czkInput = screen.getByLabelText("CZK amount");

    // Change to USD (default foreign source still 1)
    await user.selectOptions(foreignSelect, "USD");
    // 1 USD -> 23.456 CZK -> formatted to 23.456
    expect(czkInput).toHaveValue("23.456");

    // Change to JPY (amount 100)
    await user.selectOptions(foreignSelect, "JPY");
    // 1 JPY with amount 100, rate 13.68: toCzk(1, JPY) = (1*13.68)/100 = 0.1368 -> formatted 0.137
    expect(czkInput).toHaveValue("0.137");
  });

  it("shows validation error for invalid input", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignInput = screen.getByLabelText("Foreign amount");
    await user.clear(foreignInput);
    await user.type(foreignInput, "abc");

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid number");
  });

  it("shows validation error for amount 0 or negative", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignInput = screen.getByLabelText("Foreign amount");
    await user.clear(foreignInput);
    await user.type(foreignInput, "0");

    expect(screen.getByRole("alert")).toHaveTextContent("Amount must be greater than 0");
  });

  it("accepts comma as decimal separator", async () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<CurrencyConverter />);
    const user = userEvent.setup();

    const foreignInput = screen.getByLabelText("Foreign amount");
    const czkInput = screen.getByLabelText("CZK amount");

    await user.clear(foreignInput);
    await user.type(foreignInput, "1,5");
    // 1.5 EUR -> 37.5 CZK
    expect(czkInput).toHaveValue("37.500");
  });

  it("returns null when there are no rates", () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: [] },
    });

    const { container } = render(<CurrencyConverter />);
    expect(container).toBeEmptyDOMElement();
  });
});
