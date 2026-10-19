import createError from "@fastify/error";

export const UpstreamError = createError("UPSTREAM_ERROR", "Exchange rate provider is unavailable", 502);
export const UpstreamTimeoutError = createError("UPSTREAM_TIMEOUT", "Exchange rate provider timed out", 504);
export const UpstreamParseError = createError("UPSTREAM_INVALID_RESPONSE", "Exchange rate provider returned unexpected data", 502);