import { useCallback } from "react";
import type { ExchangeRates } from "../types/ExchangeRates";
import type { ArithmeticOperator } from "../types/Calculator";

export const useCurrencyConverter = (rates: ExchangeRates, operation: ArithmeticOperator) => {
  const convertAndFormatAmount = useCallback(
    (fromCurrency: string, toCurrency: string, amount: string): string => {
      if (!rates || operation) return "";

      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      const parsedAmount = parseFloat(amount);

      if (!fromRate || !toRate || isNaN(parsedAmount)) return "";

      const converted = (toRate / fromRate) * parsedAmount;

      return Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: toCurrency,
      }).format(converted);
    },
    [rates, operation]
  );

  return { convertAndFormatAmount };
};
