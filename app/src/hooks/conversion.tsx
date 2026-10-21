import type { Rate } from "../api/gen/models";

export const toForeign = (amount: number, rate: Rate) => (amount * rate.amount) / rate.rate;
export const toCzk = (amount: number, rate: Rate) => (amount * rate.rate) / rate.amount;
export const formatCurrency = (value: number) => (Number.isFinite(value) ? value.toFixed(2) : "");