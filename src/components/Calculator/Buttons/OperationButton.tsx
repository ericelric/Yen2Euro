import styles from "./Buttons.module.css";
import {
  CALCULATOR_ACTIONS,
  type CalculatorActionType,
  type ArithmeticOperator,
} from "../../../types/Calculator";

type OperationButtonProps = {
  operation: ArithmeticOperator;
  dispatch: React.Dispatch<CalculatorActionType>;
};

const OperationButton = ({ operation, dispatch }: OperationButtonProps) => {
  return (
    <button
      className={`
        ${styles.button}
        ${styles["button--operation"]}
        `}
      onClick={() =>
        dispatch({
          type: CALCULATOR_ACTIONS.ArithmeticOperator,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
