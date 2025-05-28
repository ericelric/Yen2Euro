import styles from "./Calculator.module.css";
import { useReducer } from "react";
import Display from "./Display/Display";
import ControlButton from "./Buttons/ControlButton";
import OperationButton from "./Buttons/OperationButton";
import DigitButton from "./Buttons/DigitButton";

import {
  CALCULATOR_ACTIONS,
  type CalculatorActionType,
  type CalculatorState,
} from "../../types/Calculator";

const initialState: CalculatorState = {
  currentOperand: "0",
  prevOperand: "",
  operation: undefined,
  overwrite: true,
};

function calculatorReducer(state: CalculatorState, action: CalculatorActionType): CalculatorState {
  switch (action.type) {
    case CALCULATOR_ACTIONS.AddDigit:
      if (state.overwrite && action.payload.digit === ".") {
        return {
          ...state,
          currentOperand: `0${action.payload.digit}`,
          overwrite: false,
        };
      }
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite: false,
        };
      }
      if (action.payload.digit === "0" && state.currentOperand === "0") return state;
      if (action.payload.digit === "." && state.currentOperand.includes(".")) return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload.digit}`,
      };

    case CALCULATOR_ACTIONS.ArithmeticOperator:
      if (state.currentOperand === "" && state.prevOperand === "") return state;
      if (state.currentOperand === "") {
        return { ...state, operation: action.payload.operation };
      }
      if (state.prevOperand === "") {
        return {
          ...state,
          operation: action.payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: "",
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: action.payload.operation,
        currentOperand: "",
      };

    case CALCULATOR_ACTIONS.Evaluate:
      if (state.operation === undefined || state.currentOperand === "" || state.prevOperand === "")
        return state;

      return {
        ...state,
        overwrite: true,
        prevOperand: "",
        operation: undefined,
        currentOperand: evaluate(state),
      };

    case CALCULATOR_ACTIONS.Delete:
      if (state.overwrite) return initialState;
      if (state.currentOperand === "") return state;
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case CALCULATOR_ACTIONS.AllClear:
      return initialState;
  }
}

function evaluate({ currentOperand, prevOperand, operation }: CalculatorState): string {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  switch (operation) {
    case "+":
      return (prev + current).toString();
    case "-":
      return (prev - current).toString();
    case "*":
      return (prev * current).toString();
    case "÷":
      return (prev / current).toString();
    default:
      return "";
  }
}

const Calculator = () => {
  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(
    calculatorReducer,
    initialState
  );

  return (
    <div className={styles["calculator__wrapper"]}>
      <Display currentOperand={currentOperand} prevOperand={prevOperand} operation={operation} />
      <div className={styles["calculator__buttons"]}>
        <ControlButton
          label="AC"
          dispatch={dispatch}
          calculatorAction={CALCULATOR_ACTIONS.AllClear}
          twoCol={true}
        />
        <ControlButton
          label="DEL"
          dispatch={dispatch}
          calculatorAction={CALCULATOR_ACTIONS.Delete}
        />
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <ControlButton
          label="="
          dispatch={dispatch}
          calculatorAction={CALCULATOR_ACTIONS.Evaluate}
          twoCol={true}
        />
      </div>
    </div>
  );
};
export default Calculator;
