import styles from "./Display.module.css";
import swapIcon from "../../../assets/swap_vert.svg";
import { useState } from "react";
import Select, { type SingleValue } from "react-select";
import { customSelectStyles } from "./customSelectStyles";
import { useExchangeRates } from "../../../hooks/useExchangeRates";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { options } from "../../../data/currencyOptions";
import type { ArithmeticOperator } from "../../../types/Calculator";
import type { CurrencyOption } from "../../../types/ExchangeRates";
import { LOCAL_STORAGE_KEYS } from "../../../constants/storageKeys";

type DisplayProps = {
  currentOperand: string;
  prevOperand: string;
  operation: ArithmeticOperator;
};

const Display = ({ currentOperand, prevOperand, operation }: DisplayProps) => {
  const { rates, timestamp, loading, error } = useExchangeRates();
  const { convertAndFormatAmount } = useCurrencyConverter(rates, operation);

  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FROM_CURRENCY);
    return saved ? JSON.parse(saved) : { value: "JPY", label: "JPY - Japanese Yen" };
  });

  const [toCurrency, setToCurrency] = useState<CurrencyOption>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TO_CURRENCY);
    return saved ? JSON.parse(saved) : { value: "EUR", label: "EUR - Euro" };
  });

  const handleCurrencyChange =
    (setter: React.Dispatch<React.SetStateAction<CurrencyOption>>, key: string) =>
    (newValue: SingleValue<CurrencyOption>) => {
      if (newValue) {
        setter(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    localStorage.setItem(LOCAL_STORAGE_KEYS.FROM_CURRENCY, JSON.stringify(toCurrency));
    localStorage.setItem(LOCAL_STORAGE_KEYS.TO_CURRENCY, JSON.stringify(fromCurrency));
  };

  const formattedTimestamp =
    timestamp != null
      ? new Date(timestamp * 1000).toLocaleString("de-DE", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      : "N/A";

  return (
    <div className={styles["display"]}>
      <div className={styles["display__numbers"]}>
        <span className={styles["display__prev-operand"]}>
          {prevOperand} {operation}
        </span>
        <span>{currentOperand}</span>
      </div>

      <div className={styles["display__currency-grid"]}>
        <Select
          options={options}
          value={fromCurrency}
          onChange={handleCurrencyChange(setFromCurrency, LOCAL_STORAGE_KEYS.FROM_CURRENCY)}
          styles={customSelectStyles}
        />

        <div className={styles["display__divider"]} />

        <Select
          options={options}
          value={toCurrency}
          onChange={handleCurrencyChange(setToCurrency, LOCAL_STORAGE_KEYS.TO_CURRENCY)}
          styles={customSelectStyles}
        />

        <button className={styles["display__swap-button"]} onClick={switchCurrencies}>
          <img src={swapIcon} alt="Swap currencies" className={styles["display__swap-icon"]} />
        </button>
      </div>
      <div className={styles["display__numbers"]}>
        {error ? (
          <span className={styles["display__error"]}>{error}</span>
        ) : loading ? (
          <span className={styles["display__notice"]}>Fetching latest exchange rates…</span>
        ) : (
          <span>
            {convertAndFormatAmount(fromCurrency.value, toCurrency.value, currentOperand)}
          </span>
        )}
      </div>
      <div className={styles.timestamp}>{`Rates as of: ${formattedTimestamp}`}</div>
    </div>
  );
};

export default Display;
