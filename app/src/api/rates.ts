import { parse, format } from 'date-fns';

// const CNB_API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing';
const CNB_API_URL = '/api/central-bank-exchange-rate-fixing';

export class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }
}

export type DailyRates = {
    date: string;
    rates: Rate[]
}

export type Rate = {
    country: string;
    currency: string;
    amount: number;
    currencyCode: string;
    rate: number;
}

export async function getDailyRates() {
    const response = await fetch(`${CNB_API_URL}/daily.txt`);

    if (!response.ok) {
        throw new HttpError(response.status, "Network response was not ok");
    }

    return parseDailyRates(await response.text());
}

function parseDailyRates(text: string): DailyRates {
    const [dateLine, headerLine, ...dataLines] = text.trim().split(/\r?\n/);

    if (!dateLine || !headerLine?.startsWith("Country|Currency|Amount|Code|Rate")) {
        throw new Error("Invalid response format");
    }

    const date = parse(dateLine, 'dd.MM.yyyy', new Date());

    const rates = dataLines
        .filter(Boolean)
        .map((line): Rate => {
            const [country, currency, amount, currencyCode, rate] = line.split("|");
            return {
                country, currency, amount: Number(amount), currencyCode, rate: Number(rate)
            }
        }
        );

    return {
        date: format(date, "yyyy-MM-dd"),
        rates
    };
}