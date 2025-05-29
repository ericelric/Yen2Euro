import type { StylesConfig } from "react-select";
import type { CurrencyOption } from "../../../types/ExchangeRates";

export const customSelectStyles: StylesConfig<CurrencyOption, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#111",
    borderColor: "#fff",
    borderWidth: "1px",
    boxShadow: state.isFocused
      ? "2px 3px 0px rgba(51, 255, 216, 0.75)"
      : "2px 3px 2px rgba(245, 245, 245, 0.5)",
    color: "#fff",
    fontSize: "clamp(1rem, 4cqi, 2rem)",
    height: "10cqi",
    outline: "none",
    "&:hover": {
      boxShadow: "2px 3px 0px rgba(51, 255, 216, 0.75)",
      cursor: "pointer",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2e3742",
    color: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "4px 5px 3px rgba(0, 0, 0, 0.5)",
    fontFamily: "'Oxanium', sans-serif",
    padding: "0.125rem 0.5rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "white" : "none",
    color: state.isFocused ? "black" : "white",
    cursor: "pointer",
    borderRadius: "0.5rem",
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#fff",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
