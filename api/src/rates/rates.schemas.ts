import { z } from "zod";

export const RateSchema = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number(),
  currencyCode: z.string().length(3),
  rate: z.number(),
}).meta({ id: "Rate" });;

export const DailyRatesSchema = z.object({
  date: z.iso.date(),
  sequence: z.number().int().positive(),
  rates: z.array(RateSchema),
}).meta({ id: "DailyRates" });;

export const ErrorSchema = z.object({
  statusCode: z.number().int(),
  error: z.string(),
  code: z.string(),
  message: z.string(),
}).meta({ id: "ErrorResponse" });

export type Rate = z.infer<typeof RateSchema>;
export type DailyRates = z.infer<typeof DailyRatesSchema>;