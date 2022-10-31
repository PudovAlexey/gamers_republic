import { oposite } from '../../../utils/utils';

function switchTurnToAnotherUser({
  turnState,
  setTurnState,
  setFieldState,
  fieldState,
  iconsDict,
  coords,
}) {
  const {col, row} = coords
  if (!fieldState[row][col]?.key) {
    let updateFieldState = {
      ...fieldState,
      [row]: { ...fieldState[row], [col]: iconsDict[turnState] },
    };
    let nextTurn = oposite(turnState);
    setTurnState(nextTurn);
    setFieldState(updateFieldState);
  }
}

export { switchTurnToAnotherUser };
