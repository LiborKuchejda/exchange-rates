import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { DailyRatesSchema, ErrorSchema, type DailyRates } from "./rates.schemas.js";
import { getDailyRates } from "./rates.service.ts";

export const ratesRoutes: FastifyPluginAsync = async (app) => {
    app.withTypeProvider<ZodTypeProvider>().get<{ Reply: DailyRates }>(
        "/daily",
        {
            schema: {
                response: {
                    200: DailyRatesSchema,
                    502: ErrorSchema,
                    504: ErrorSchema,
                },
                operationId: "getDailyRates",
            },
        },
        () => getDailyRates()
    );
};