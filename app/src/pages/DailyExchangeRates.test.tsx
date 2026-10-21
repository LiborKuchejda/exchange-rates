import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DailyExchangeRates } from "./DailyExchangeRates";
import type { Rate } from "../api/gen/models";

vi.mock("../hooksAndUtils/useDailyRates", () => ({
  useDailyRates: vi.fn(),
}));

// Mock child components to simplify testing
vi.mock("../components/RatesList", () => ({
  RatesList: () => <div data-testid="rates-list">RatesList</div>,
}));

vi.mock("../components/CurrencyConverter", () => ({
  CurrencyConverter: () => <div data-testid="currency-converter">CurrencyConverter</div>,
}));

import { useDailyRates } from "../hooksAndUtils/useDailyRates";

const mockRates: Rate[] = [
  { country: "Australia", currency: "dollar", amount: 1, currencyCode: "AUD", rate: 15.191 },
];

describe("DailyExchangeRates", () => {
  it("displays the date and description", () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { date: "2026-10-21", rates: mockRates },
    });

    render(<DailyExchangeRates />);

    expect(screen.getByText("Date: 2026-10-21")).toBeInTheDocument();
  });

  it("renders CurrencyConverter and RatesList components", () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { date: "2026-10-21", rates: mockRates },
    });

    render(<DailyExchangeRates />);

    expect(screen.getByTestId("currency-converter")).toBeInTheDocument();
    expect(screen.getByTestId("rates-list")).toBeInTheDocument();
  });
});
