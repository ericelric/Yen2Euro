import styles from "./Display.module.css";
import swapIcon from "../../../assets/swap_vert.svg";
import { useState } from "react";
import Select, { type SingleValue } from "react-select";
import { customSelectStyles } from "./customSelectStyles";
import { useExchangeRates } from "../../../hooks/useExchangeRates";
import { useCurrencyConverter } from "../../../hooks/useCurrencyConverter";
import { options } from "../../../data/currencyOptions";
import type { ArithmeticOperator } from "../../../types/Calculator";
import type { CurrencyOption } from "../../../types/Currency";

type DisplayProps = {
  currentOperand: string;
  prevOperand: string;
  operation: ArithmeticOperator;
};

const Display = ({ currentOperand, prevOperand, operation }: DisplayProps) => {
  const { rates, loading, error } = useExchangeRates();
  const { convertAndFormatAmount } = useCurrencyConverter(rates, operation);

  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>({
    value: "JPY",
    label: "JPY - Japanese Yen",
  });
  const [toCurrency, setToCurrency] = useState<CurrencyOption>({
    value: "EUR",
    label: "EUR - Euro",
  });

  const handleCurrencyChange =
    (setter: React.Dispatch<React.SetStateAction<CurrencyOption>>) =>
    (newValue: SingleValue<CurrencyOption>) => {
      if (newValue) setter(newValue);
    };

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

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
          onChange={handleCurrencyChange(setFromCurrency)}
          styles={customSelectStyles}
        />

        <div className={styles["display__divider"]} />

        <Select
          options={options}
          value={toCurrency}
          onChange={handleCurrencyChange(setToCurrency)}
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
    </div>
  );
};

export default Display;
