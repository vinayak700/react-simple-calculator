import { ACTIONS } from "./App";
import { Button } from "./styled";

const DigitButton = ({ dispatch, digit }) => {
  return (
    <Button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      // style={digit === "0" ? { width: "50%" } : {}}
    >
      {digit}
    </Button>
  );
};
export default DigitButton;
