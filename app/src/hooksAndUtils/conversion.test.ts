import { describe, expect, it } from "vitest";
import { formatCurrency, toCzk, toForeign } from "./conversion";
import type { Rate } from "../api/gen/models";

const rate: Rate = {
  country: "USA",
  currency: "dollar",
  amount: 1,
  currencyCode: "USD",
  rate: 23.456,
};

describe("conversion utils", () => {
  it("toCzk converts foreign amount to CZK correctly", () => {
    // toCzk(amount, rate) = (amount * rate.rate) / rate.amount
    expect(toCzk(1, rate)).toBe(23.456);
    expect(toCzk(10, rate)).toBe(234.56);
  });

  it("toForeign converts CZK amount to foreign currency correctly", () => {
    // toForeign(amount, rate) = (amount * rate.amount) / rate.rate
    expect(toForeign(23.456, rate)).toBe(1);
    expect(toForeign(234.56, rate)).toBe(10);
  });

  it("toCzk handles different amounts (e.g. 100 JPY)", () => {
    const jpy: Rate = {
      country: "Japan",
      currency: "yen",
      amount: 100,
      currencyCode: "JPY",
      rate: 13.68,
    };
    expect(toCzk(100, jpy)).toBe(13.68);
    expect(toCzk(50, jpy)).toBe(6.84);
  });

  it("toForeign handles different amounts (e.g. 100 JPY)", () => {
    const jpy: Rate = {
      country: "Japan",
      currency: "yen",
      amount: 100,
      currencyCode: "JPY",
      rate: 13.68,
    };
    expect(toForeign(13.68, jpy)).toBe(100);
    expect(toForeign(6.84, jpy)).toBe(50);
  });

  it("formatCurrency formats finite numbers to 3 decimal places", () => {
    expect(formatCurrency(23.456)).toBe("23.456");
    expect(formatCurrency(1)).toBe("1.000");
    expect(formatCurrency(0)).toBe("0.000");
  });

  it("formatCurrency returns empty string for non-finite values", () => {
    expect(formatCurrency(NaN)).toBe("");
    expect(formatCurrency(Infinity)).toBe("");
    expect(formatCurrency(-Infinity)).toBe("");
  });
});
