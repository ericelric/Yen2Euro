import styles from "./Display.module.css";
import type { ArithmeticOperator } from "../../../types/Calculator";

type DisplayProps = {
  currentOperand: string;
  prevOperand: string;
  operation: ArithmeticOperator;
};

const Display = ({ currentOperand, prevOperand, operation }: DisplayProps) => {
  return (
    <div className={styles["display"]}>
      <div className={styles["display__numbers"]}>
        <span className={styles["display__prev-operand"]}>
          {prevOperand} {operation}
        </span>
        <span>{currentOperand}</span>
      </div>
    </div>
  );
};

export default Display;
