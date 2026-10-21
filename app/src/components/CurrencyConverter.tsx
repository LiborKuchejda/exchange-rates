import { useState } from "react";
import styled from "styled-components";
import { z } from "zod";
import { ActionBanner, ErrorText, Input, Select } from "./UX";
import { useDailyRates } from "../hooksAndUtils/useDailyRates";
import { formatCurrency, toCzk, toForeign } from "../hooksAndUtils/conversion";

const amountSchema = z
  .string()
  .trim()
  .min(1, "Enter an amount")
  .regex(/^\d+([.,]\d*)?$/, "Enter a valid number")
  .transform((s) => Number(s.replace(",", ".")))
  .pipe(
    z
      .number()
      .positive("Amount must be greater than 0")
      .max(1_000_000_000, "Amount is too large"),
  );

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const InputPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
  flex: 1 1 0;
`;

const Code = styled.div`
  flex: none;
  padding: 0.75rem;
`;

export function CurrencyConverter() {
  const { data: { rates } } = useDailyRates();
  const [code, setCode] = useState("EUR");
  const [conversion, setConversion] = useState<{ source: "czk" | "foreign"; amountText: string }>({
    source: "foreign",
    amountText: "1",
  });

  if (!rates.length) {
    return null;
  }

  const rate = rates.find((r) => r.currencyCode === code) ?? rates[0];
  const result = amountSchema.safeParse(conversion.amountText);
  const amount = result.success ? result.data : NaN;
  const errorMessage = result.success ? undefined : result.error.issues[0]?.message;
  const foreignValue = conversion.source === "foreign" ? conversion.amountText : formatCurrency(toForeign(amount, rate));
  const czkValue = conversion.source === "czk" ? conversion.amountText : formatCurrency(toCzk(amount, rate));

  return (
    <Wrapper>
      <ActionBanner>
        <InputPanel>
          <Input
            aria-label="Foreign amount"
            inputMode="decimal"
            value={foreignValue}
            aria-invalid={conversion.source === "foreign" && !!errorMessage}
            onChange={(e) => setConversion({ source: "foreign", amountText: e.target.value })}
          />
          <Select
            aria-label="Foreign currency"
            value={rate.currencyCode}
            onChange={(e) => setCode(e.target.value)}
          >
            {rates.map((r) => (
              <option key={r.currencyCode} value={r.currencyCode}>
                {r.currencyCode}
              </option>
            ))}
          </Select>
        </InputPanel>

        <InputPanel>
          <Input
            aria-label="CZK amount"
            inputMode="decimal"
            value={czkValue}
            aria-invalid={conversion.source === "czk" && !!errorMessage}
            onChange={(e) => setConversion({ source: "czk", amountText: e.target.value })}
          />
          <Code>CZK</Code>
        </InputPanel>
      </ActionBanner>

      {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
    </Wrapper>
  );
}