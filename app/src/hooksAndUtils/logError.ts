import type { ErrorInfo } from "react";

export function logError(error: Error, info: ErrorInfo) {
  console.error("Oops! Error:", error.message, info.componentStack);
}