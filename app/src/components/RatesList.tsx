import { useSuspenseQuery } from "@tanstack/react-query"
import { getDailyRates } from "../api/gen";

export function RatesList() {
    const { data } = useSuspenseQuery({ queryKey: ["rates"], queryFn: getDailyRates });
    console.log("PIKACU:", data);

    return (
        <ul>
            {data.rates.map((rate) => (
                <li key={rate.currencyCode}>{rate.currencyCode}-{rate.amount}-{rate.rate}</li>
            ))}
        </ul>
    );
}