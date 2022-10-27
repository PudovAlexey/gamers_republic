import { oposite } from '../../../utils/utils';

function switchTurnToAnotherUser({
  turnState,
  setTurnState,
  setFieldState,
  updateFieldState,
}) {
  let nextTurn = oposite(turnState);
  setTurnState(nextTurn);
  setFieldState(updateFieldState);
}

export { switchTurnToAnotherUser };
