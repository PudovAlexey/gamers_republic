import { oposite } from '../../../utils/utils';

function switchToPcTurn({
  setFieldState,
  setTurnState,
  updateFieldState,
  turnState,
  pc,
}) {
  setFieldState(updateFieldState);
  setTurnState(oposite(turnState));
  pc.stepTo(JSON.parse(JSON.stringify(updateFieldState))).then(
    (afterPCPlay) => {
      setFieldState({ ...afterPCPlay });
      setTurnState(turnState);
    }
  );
}

export { switchToPcTurn };
