import createError from "@fastify/error";
import fp from "fastify-plugin";
import type { FastifyError, FastifyPluginAsync } from "fastify";

export const UpstreamError = createError("UPSTREAM_ERROR", "Exchange rate provider is unavailable", 502);
export const UpstreamTimeoutError = createError("UPSTREAM_TIMEOUT", "Exchange rate provider timed out", 504);
export const UpstreamParseError = createError("UPSTREAM_INVALID_RESPONSE", "Exchange rate provider returned unexpected data", 502);

const errorHandlerPlugin: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    const status = error.statusCode ?? 500;

    if (status >= 500) {
      request.log.error({ err: error }, "request failed");
    }

    // known errors (validation, 4xx, @fastify/error ones) pass through unchanged
    if (
      error.validation ||
      (status < 500 && error.statusCode) ||
      error.code?.startsWith("UPSTREAM_")
    ) {
      return reply.send(error);
    }

    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Internal Server Error",
    });
  });
};


export const globalErrorHandler =  fp(errorHandlerPlugin, { name: "error-handler" });