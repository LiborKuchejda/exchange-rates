import { afterEach, describe, expect, it, vi } from "vitest";
import { getDailyRates, parseDailyRates } from "./rates.service.ts";
import { UpstreamError, UpstreamParseError } from "../errors.js";

// Trimmed down copy of the real CNB daily.txt payload
const CNB_PAYLOAD = `21 Oct 2026 #203
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.191
Japan|yen|100|JPY|13.680
`;

describe("parseDailyRates", () => {
  it("parses date, sequence and rates", () => {
    const result = parseDailyRates(CNB_PAYLOAD);

    expect(result.date).toBe("2026-10-21");
    expect(result.sequence).toBe(203);
    expect(result.rates).toEqual([
      { country: "Australia", currency: "dollar", amount: 1, currencyCode: "AUD", rate: 15.191 },
      { country: "Japan", currency: "yen", amount: 100, currencyCode: "JPY", rate: 13.68 },
    ]);
  });

  it("throws UpstreamParseError on an unexpected format", () => {
    expect(() => parseDailyRates("not a cnb payload")).toThrow(UpstreamParseError);
  });

  it("throws UpstreamParseError on an invalid date", () => {
    const payload = `nope #1\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|15.191\n`;

    expect(() => parseDailyRates(payload)).toThrow(UpstreamParseError);
  });

  it("throws UpstreamParseError when the payload does not match the schema", () => {
    const payload = `21 Oct 2026 #203\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|NaN\n`;

    expect(() => parseDailyRates(payload)).toThrow(UpstreamParseError);
  });
});

describe("getDailyRates", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches and parses the rates", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => CNB_PAYLOAD });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getDailyRates();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain("daily.txt");
    expect(result.sequence).toBe(203);
    expect(result.rates).toHaveLength(2);
  });

  it("throws UpstreamError when CNB responds with an error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    await expect(getDailyRates()).rejects.toThrow(UpstreamError);
  });

  it("throws UpstreamParseError when CNB returns an unexpected body", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, text: async () => "garbage" }));

    await expect(getDailyRates()).rejects.toThrow(UpstreamParseError);
  });
});
