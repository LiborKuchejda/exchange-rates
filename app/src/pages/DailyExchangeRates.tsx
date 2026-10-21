import styled from "styled-components";
import { RatesList } from "../components/RatesList";
import { CurrencyConverter } from "../components/CurrencyConverter";
import { useDailyRates } from "../hooks/useDailyRates";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--color-dark-text);
  font-size: var(--font-size-lg);
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  color: var(--color-light-text);
  font-size: var(--font-size-sm);
`;

export function DailyExchangeRates() {
    const { data } = useDailyRates();
    const date = data.date;
    return (
        <Wrapper>
            <header>
                <Title>Date: {date}</Title>
                <Description>
                    Czech national bank daily exchange rates against the Czech koruna (CZK).
                </Description>
            </header>
            <CurrencyConverter />
            <RatesList />
        </Wrapper>
    );
}