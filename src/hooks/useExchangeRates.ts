import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { ExchangeRates, ExchangeRatesResponse } from "../types/ExchangeRates";
import { LOCAL_STORAGE_KEYS } from "../constants/storageKeys";

const SIX_HOURS = 6 * 60 * 60;

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const cachedResponse = localStorage.getItem(LOCAL_STORAGE_KEYS.EXCHANGE_RATES);

        if (cachedResponse) {
          const parsedResponse = JSON.parse(cachedResponse) as ExchangeRatesResponse;
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);

          const age = currentTimeInSeconds - parsedResponse.timestamp;

          if (age < SIX_HOURS) {
            setRates(parsedResponse.rates);
            setTimestamp(parsedResponse.timestamp);
            setLoading(false);
            return;
          }
        }

        let response: AxiosResponse<ExchangeRatesResponse>;

        if (import.meta.env.DEV) {
          response = await axios.get<ExchangeRatesResponse>("/mockData.json");
        } else {
          response = await axios.get<ExchangeRatesResponse>(
            "https://openexchangerates.org/api/latest.json",
            {
              params: {
                app_id: import.meta.env.VITE_OPEN_EXCHANGE_RATES_KEY,
              },
            }
          );
        }
        setRates(response.data.rates);
        setTimestamp(response.data.timestamp);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify(response.data));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  return { rates, timestamp, loading, error };
}
