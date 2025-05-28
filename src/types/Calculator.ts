export const CALCULATOR_ACTIONS = {
  AddDigit: "ADD_DIGIT",
  ArithmeticOperator: "ARITHMETIC_OPERATOR",
  Evaluate: "EVALUATE",
  Delete: "DELETE",
  AllClear: "ALL_CLEAR",
} as const;

export type ArithmeticOperator = "+" | "-" | "*" | "÷" | undefined;

export type CalculatorActionType =
  | { type: typeof CALCULATOR_ACTIONS.AddDigit; payload: { digit: string } }
  | {
      type: typeof CALCULATOR_ACTIONS.ArithmeticOperator;
      payload: { operation: ArithmeticOperator };
    }
  | { type: typeof CALCULATOR_ACTIONS.Evaluate }
  | { type: typeof CALCULATOR_ACTIONS.Delete }
  | { type: typeof CALCULATOR_ACTIONS.AllClear };

export type CalculatorState = {
  currentOperand: string;
  prevOperand: string;
  operation: ArithmeticOperator;
  overwrite: boolean;
};
