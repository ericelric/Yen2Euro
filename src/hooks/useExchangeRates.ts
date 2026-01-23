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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isUsingCachedData, setIsUsingCachedData] = useState(false);

  // Listen for online/offline status changes
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      const cachedResponse = localStorage.getItem(LOCAL_STORAGE_KEYS.EXCHANGE_RATES);
      let cachedData: ExchangeRatesResponse | null = null;

      if (cachedResponse) {
        cachedData = JSON.parse(cachedResponse) as ExchangeRatesResponse;
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const age = currentTimeInSeconds - cachedData.timestamp;

        // If cached data is fresh, use it
        if (age < SIX_HOURS) {
          setRates(cachedData.rates);
          setTimestamp(cachedData.timestamp);
          setIsUsingCachedData(false);
          setLoading(false);
          return;
        }
      }

      // If offline and we have cached data (even if stale), use it
      if (!navigator.onLine && cachedData) {
        setRates(cachedData.rates);
        setTimestamp(cachedData.timestamp);
        setIsUsingCachedData(true);
        setLoading(false);
        return;
      }

      // Try to fetch fresh data
      try {
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
        setIsUsingCachedData(false);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify(response.data));
      } catch (error) {
        // If fetch fails but we have cached data (even if stale), use it
        if (cachedData) {
          setRates(cachedData.rates);
          setTimestamp(cachedData.timestamp);
          setIsUsingCachedData(true);
        } else {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  return { rates, timestamp, loading, error, isOffline, isUsingCachedData };
}
