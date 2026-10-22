import type { ErrorInfo } from "react";

export function logError(error: unknown, info: ErrorInfo) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Oops! Error:", message, info.componentStack);
}