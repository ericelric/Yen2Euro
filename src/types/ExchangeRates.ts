export type ExchangeRates = Record<string, number>;

export interface ExchangeRatesResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: ExchangeRates;
}

export type CurrencyOption = {
  value: string;
  label: string;
};
