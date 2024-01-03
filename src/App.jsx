import { useReducer, useState } from "react";
import DigitButton from "./DigitButton";
import { Button, CalculatorWrapper, Display } from "./styled";
import OperationButton from "./OperationButton";

// Action Constants
export const ACTIONS = {
  CHOOSE_OPERATION: "Choose Operation",
  ADD_DIGIT: "Add Digit",
  DELETE_DIGIT: "Delete Digit",
  CLEAR: "Clear",
  EVALUATE: "Evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overWrite: false,
        };
      }
      if (payload.digit === "0" && state.currOperand === "0") return state;
      if (payload.digit === "." && state.currOperand.includes("."))
        return state;
      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) return state;
      if (state.currOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: null,
        };
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          overWrite: false,
          currOperand: null,
        };
      }
      if (state.currOperand == null) return state;
      if (state.currOperand.length === 1) {
        return { ...state, currOperand: null };
      }

      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currOperand == null ||
        state.prevOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overWrite: true,
        prevOperand: null,
        operation: null,
        currOperand: evaluate(state),
      };
    default:
      return state;
  }
};

const evaluate = ({ prevOperand, currOperand, operation }) => {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "%":
      computation = prev % curr;
      break;
  }
  return computation.toString();
};

function App() {
  const [{ prevOperand, currOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  const [toggleSign, setToggleSign] = useState(false);
  const handleToggleSign = () => {
    setToggleSign((prev) => !prev);
    return toggleSign ? (
      <>
        {" "}
        <OperationButton operation="+" dispatch={dispatch} />
      </>
    ) : (
      <OperationButton operation="-" dispatch={dispatch} />
    );
  };
  return (
    <CalculatorWrapper>
      <Display>
        <div className="input">
          {prevOperand}
          {operation}
        </div>
        <div className="output">{currOperand}</div>
      </Display>

      <div>
        <Button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</Button>
        <Button onClick={handleToggleSign}>+/-</Button>
        <OperationButton operation="%" dispatch={dispatch} />
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <Button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          CE
        </Button>
        <Button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</Button>
      </div>
    </CalculatorWrapper>
  );
}

export default App;
