import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { DailyRatesSchema, errorSchema, type DailyRates } from "./rates.schemas.js";
import { getDailyRates } from "./rates.service.ts";

const dailyRatesJsonSchema = z.toJSONSchema(DailyRatesSchema, { target: "draft-7" });

export const ratesRoutes: FastifyPluginAsync = async (app) => {
    app.get<{ Reply: DailyRates }>(
        "/daily",
        { schema: { response: { 200: dailyRatesJsonSchema, 502: errorSchema, 504: errorSchema } } },
        () => getDailyRates()
    );
};