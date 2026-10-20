import Fastify, { type FastifyError } from 'fastify';
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod';
import { ratesRoutes } from "./rates/rates.routes.js";
import { globalErrorHandler } from './errors.ts';

const app = Fastify({ logger: true });
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(globalErrorHandler);

app.register(rateLimit, {
  global: true,
  max: 100,
  timeWindow: "1 minute",
});

app.register(swagger, {
  openapi: {
    openapi: "3.1.1",
    info: {
      title: "Exchange Rates API",
      description: "Daily CNB exchange rates",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
  transformObject: jsonSchemaTransformObject,
});

app.register(swaggerUi, {
  routePrefix: "/docs",
});

app.register(ratesRoutes, { prefix: "/rates/" });

try {
  await app.listen({ port: Number(process.env.PORT) || 3001, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}