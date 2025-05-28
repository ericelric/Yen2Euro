import styles from "./Buttons.module.css";
import { CALCULATOR_ACTIONS, type CalculatorActionType } from "../../../types/Calculator";

type DigitButtonProps = {
  digit: string;
  dispatch: React.Dispatch<CalculatorActionType>;
};

const DigitButton = ({ digit, dispatch }: DigitButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => dispatch({ type: CALCULATOR_ACTIONS.AddDigit, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
