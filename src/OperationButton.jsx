import { ACTIONS } from "./App";
import { Button } from "./styled";

const OperationButton = ({ dispatch, operation }) => {
  return (
    <Button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </Button>
  );
};
export default OperationButton;
