import { useEffect, useState } from "react";
import type { ExchangeRates } from "../types/Currency";

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch("/src/data/mockData.json")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch(() => {
        setError("Rates could not be fetched.");
        setLoading(false);
      });
  }, []);

  return { rates, loading, error };
}
