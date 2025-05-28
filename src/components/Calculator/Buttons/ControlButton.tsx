import styles from "./Buttons.module.css";
import { CALCULATOR_ACTIONS, type CalculatorActionType } from "../../../types/Calculator";

type ControlButtonProps = {
  label: string;
  dispatch: React.Dispatch<CalculatorActionType>;
  calculatorAction:
    | typeof CALCULATOR_ACTIONS.Evaluate
    | typeof CALCULATOR_ACTIONS.Delete
    | typeof CALCULATOR_ACTIONS.AllClear;
  twoCol?: boolean;
};

const ControlButton = ({
  label,
  dispatch,
  calculatorAction,
  twoCol = false,
}: ControlButtonProps) => {
  return (
    <button
      className={`
        ${styles.button}
        ${styles["button--operation"]}
        ${twoCol ? styles["button--double"] : ""}
        `}
      onClick={() => dispatch({ type: calculatorAction })}
    >
      {label}
    </button>
  );
};

export default ControlButton;
