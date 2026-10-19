import { z } from "zod";

export const RateSchema = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number(),
  currencyCode: z.string().length(3),
  rate: z.number(),
});

export const DailyRatesSchema = z.object({
  date: z.iso.date(),
  sequence: z.number().int().positive(),
  rates: z.array(RateSchema),
});

export type Rate = z.infer<typeof RateSchema>;
export type DailyRates = z.infer<typeof DailyRatesSchema>;

export const errorSchema = {
  type: "object",
  properties: {
    statusCode: { type: "integer" },
    error: { type: "string" },
    code: { type: "string" },
    message: { type: "string" },
  },
};