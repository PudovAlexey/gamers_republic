import { EGameItems, EGameModes } from '../../../ts/enums';
import { oposite } from '../../../utils/utils';
import ComputerIcon from '@mui/icons-material/Computer';
import PC from '../pc';

function switchToPcTurn({
  setFieldState,
  setTurnState,
  fieldState,
  iconsDict,
  coords,
  turnState,
  pc,
}) {
  const {col, row} = coords
  if (pc.think) {
    return
  }
  if (!fieldState[row][col]?.key) {
    let updateFieldState = {
      ...fieldState,
      [row]: { ...fieldState[row], [col]: iconsDict[turnState] },
    };
    setFieldState(updateFieldState);
    setTurnState(oposite(turnState));
    pc.stepTo(JSON.parse(JSON.stringify(updateFieldState))).then(
      (afterPCPlay) => {
        setFieldState({ ...afterPCPlay });
        setTurnState(turnState);
      }
    );
  }
}

function createPc({
  dialogOpen,
  activeMode,
  startGame,
  turnState,
  setFieldState,
  fieldState,
  iconsDict,
  setPc,
  setCountWin
}) {
  if (startGame && activeMode === EGameModes.Pc && dialogOpen === false) {
    const pc = new PC(oposite(turnState), fieldState, iconsDict);
    setPc(pc);
    setCountWin(prev => ({
      ...prev,
      rival: {...prev.rival, data: {username: 'PC', avatar: ComputerIcon}}
    }))

    const check = oposite(turnState);
    if (check === EGameItems.X) {
      pc.stepTo(JSON.parse(JSON.stringify(fieldState))).then((firstStep) =>
        setFieldState(firstStep)
      );
    }
  }
}

export { switchToPcTurn, createPc };
