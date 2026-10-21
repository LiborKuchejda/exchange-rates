import styled from "styled-components";
import { useDailyRates } from "../hooksAndUtils/useDailyRates";

const Rate = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const RateValue = styled.p`
  margin-left: auto;
  font-size: var(--font-size-lg);
  line-height: 1.3;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const AmountExplaination = styled.p`
  margin-left: auto;
  text-align: right;
  color: var(--color-light-text);
  font-size: var(--font-size-sm);
  font-weight: 400;
  white-space: nowrap;
`;

const Country = styled.p`
  display: none;
  margin: 0;
  color: var(--color-light-text);
  font-size: var(--font-size-md);

  @media (min-width: 480px) {
    display: block;
  }
`;

const Amount = styled.p`
  display: none;
  margin: 0;
  color: var(--color-light-text);
  font-size: var(--font-size-md);

  @media (min-width: 480px) {
    display: block;
  }
`;

const Currency = styled.div`
    display: flex;
    flex-direction: column;
`;

const CurrencyCode = styled.h2`
  font-size: var(--font-size-lg);
  line-height: 1.3;
  font-weight: 700;
`;

const CurrencyDescription = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 0.5rem;

  color: var(--color-light-text);
  font-size: var(--font-size-sm);
`;

const List = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: var(--color-dark-text);
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-light-gray);
  }

  @media (min-width: 480px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
  }
`;

const ListHeader = styled.div`
  display: none;

  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
    padding: 0 1.5rem 0.75rem;
    color: var(--color-light-text);
    font-size: var(--font-size-sm);
    border-bottom-style: dotted;
  }
`;

const ColumnHeading = styled.span`
  &:last-child {
    text-align: right;
  }
`;
export function RatesList() {
  const { data } = useDailyRates();

  return (
    <>
      <ListHeader aria-hidden="true">
        <ColumnHeading>Currency</ColumnHeading>
        <ColumnHeading>Country</ColumnHeading>
        <ColumnHeading>Amount</ColumnHeading>
        <ColumnHeading>Exchange rate</ColumnHeading>
      </ListHeader>

      <List aria-label="Daily exchange rates">
        {data.rates.map((rate) => (
          <Item key={rate.currencyCode}>
            <Currency>
              <CurrencyCode>{rate.currencyCode}</CurrencyCode>
              <CurrencyDescription>
                {rate.country} / {rate.currency}
              </CurrencyDescription>
            </Currency>

            <Country>{rate.country}</Country>

            <Amount>{rate.amount}</Amount>

            <Rate>
              <RateValue>{rate.rate}</RateValue>
              <AmountExplaination>
                CZK / {rate.amount} {rate.currencyCode}
              </AmountExplaination>
            </Rate>
          </Item>
        ))}
      </List>
    </>
  );

}