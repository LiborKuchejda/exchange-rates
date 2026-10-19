import Fastify, { type FastifyError } from 'fastify';
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { ratesRoutes } from "./rates/rates.routes.js";

const app = Fastify({ logger: true });

app.register(rateLimit, {
  global: true,
  max: 100,
  timeWindow: "1 minute",
});

app.register(swagger, {
  openapi: {
    openapi: "3.0.3",
    info: {
      title: "Exchange Rates API",
      description: "Daily CNB exchange rates",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
});

app.register(ratesRoutes, { prefix: "/api/rates/" });

app.setErrorHandler((error:FastifyError, request, reply) => {
  const status = error.statusCode ?? 500;

  if (status >= 500) {
    request.log.error({ err: error }, "request failed");
  }

  // known errors (validation, 4xx, @fastify/error ones) pass through unchanged
  if (error.validation || (status < 500 && error.statusCode) || error.code?.startsWith("UPSTREAM_")) {
    return reply.send(error);
  }

  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Internal Server Error",
  });
});

try {
  await app.listen({ port: Number(process.env.PORT) || 3001, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}