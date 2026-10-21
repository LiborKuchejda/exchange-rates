import { parse, isValid, formatISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { DailyRatesSchema, type DailyRates, type Rate } from './rates.schemas.ts';
import { UpstreamError, UpstreamTimeoutError, UpstreamParseError } from "../errors.js";

const CNB_API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing';

export async function getDailyRates() {
    const response = await fetch(`${CNB_API_URL}/daily.txt`);

    if (!response.ok) {
        throw new UpstreamError({ cause: new Error(`CNB response status: ${response.status}`) });
    }

    return parseDailyRates(await response.text());
}

export function parseDailyRates(text: string): DailyRates {
    const [firstLine, headerLine, ...dataLines] = text.trim().split(/\r?\n/);

    if (!firstLine || !headerLine?.startsWith("Country|Currency|Amount|Code|Rate")) {
        throw new UpstreamParseError({ cause: new Error("Unexpected format") });
    }

    const [dateText, sequence] = firstLine.split('#');
    const date = parse(dateText.trim(), "d MMM yyyy", new Date(), { locale: enUS });
    if (!isValid(date)) {
        throw new UpstreamParseError({ cause: new Error(`Bad date: ${dateText}`) });
    }

    const rates = dataLines
        .filter(Boolean)
        .map((line): Rate => {
            const [country, currency, amount, currencyCode, rate] = line.split("|");
            return {
                country, currency, amount: Number(amount), currencyCode, rate: Number(rate)
            }
        }
        );

    const result = DailyRatesSchema.safeParse({
        date: formatISO(date, { representation: "date" }),
        sequence: Number(sequence),
        rates,
    });

    if (!result.success) throw new UpstreamParseError({ cause: result.error });

    return result.data;
}