import { useSuspenseQuery } from "@tanstack/react-query";
import { getDailyRates } from "../api/gen";

export function useDailyRates() {
  return useSuspenseQuery({ queryKey: ["dailyRates"], queryFn: getDailyRates });
}