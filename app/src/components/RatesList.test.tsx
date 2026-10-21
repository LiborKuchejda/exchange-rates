import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RatesList } from "./RatesList";
import type { Rate } from "../api/gen/models";

vi.mock("../hooksAndUtils/useDailyRates", () => ({
  useDailyRates: vi.fn(),
}));

import { useDailyRates } from "../hooksAndUtils/useDailyRates";

const mockRates: Rate[] = [
  { country: "Australia", currency: "dollar", amount: 1, currencyCode: "AUD", rate: 15.191 },
  { country: "Japan", currency: "yen", amount: 100, currencyCode: "JPY", rate: 13.68 },
];

describe("RatesList", () => {
  it("displays rates with correct information", () => {
    (useDailyRates as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { rates: mockRates },
    });

    render(<RatesList />);

    expect(screen.getByLabelText("Daily exchange rates")).toBeInTheDocument();
    
    // Check AUD
    expect(screen.getByText("AUD")).toBeInTheDocument();
    expect(screen.getByText("Australia / dollar")).toBeInTheDocument();
    expect(screen.getByText("15.191")).toBeInTheDocument();
    
    // Check JPY
    expect(screen.getByText("JPY")).toBeInTheDocument();
    expect(screen.getByText("Japan / yen")).toBeInTheDocument();
    expect(screen.getByText("13.68")).toBeInTheDocument();
  });
});
