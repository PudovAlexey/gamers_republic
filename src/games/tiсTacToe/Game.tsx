import React, { useEffect, useState } from 'react';
import Tic from './assets/Tic.png';
import Tac from './assets/Tac.png';
import { Box } from '@mui/material';
import { buildFieldByCoords, makeField } from '../utils/fiels';
import Toolbar from './components/toolbar/Toolbar';
import { useNavigate } from 'react-router-dom';
import { EField } from '../utils/types';
import GroupIcon from '@mui/icons-material/Group';
import ComputerIcon from '@mui/icons-material/Computer';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import { GameItems } from './gameMenu/GameItems';
import GameMenu from '../reusable/GameMenu';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';
import GameresultDialog from './components/gameresultDialog/GameresultDialog';
import { oposite } from './utils/utils';
import pcTurn from './gameModes/pc';

const fild = makeField(EField.TicTacToe);
const iconsDict = {
  X: { key: 'X', value: Tic },
  O: { key: 'O', value: Tac },
};

function compareWin(fieldState, turn) {
  let line = (key, all, item) =>
    all.filter((s) => s[key] === item[key]).length === 3;
  let isDraw = [];
  let allSteps = [];
  let steps = Object.keys(fieldState).reduce(
    (activeColumns, column) => {
      Object.keys(fieldState[column]).forEach((row, rowIdx) => {
        allSteps.push(fieldState[column][row]?.key);
        if (fieldState[column][row]?.key)
          isDraw.push(fieldState[column][row]?.key);
        if (fieldState[column][row]?.key === turn) {
          activeColumns.push({
            column,
            row,
          });
        }
      });
      return activeColumns;
    },
    []
  );
  let isWinByLine = steps.some(
    (step, _, allSteps) =>
      line('column', allSteps, step) || line('row', allSteps, step)
  );
  let isWinByDiagonal = steps.filter(
    (step) => +step.row === step.column.charCodeAt() - 64
  );
  let isWinByOpositeDiagonal = steps.filter(
    (step) => +step.row === -(step.column.charCodeAt() - 68)
  );
  let isWin =
    isWinByLine ||
    isWinByDiagonal.length === 3 ||
    isWinByOpositeDiagonal.length === 3;
  if (isWin) {
    return isWin;
  } else if (allSteps.length === isDraw.length) {
    return 'draw';
  } else {
    return false;
  }
}
function Game() {
  const theme = useTheme()
  const navigate = useNavigate();
  const styles = styleComponent(theme)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draw, setDraw] = useState(false);
  const [fieldState, setFieldState] = useState(fild);
  const [turnState, setTurnState] = useState('X');
  const [activeMode, setActiveMode] = useState(null)
  const [startGame, setStartGame] = useState<boolean>(false)
  let [countWin, setCountWin] = useState({
    O: 0,
    X: 0,
  });
  const [gameParams, setGameParams] = useState({
    gameWith: [
      {
        key: "pc",
            value: ComputerIcon,
            checked: true
      },
      {
        key: "koop",
        value: GroupIcon,
    },
    {
      key: "online",
        value: CompassCalibrationIcon
    }
],
    timer: {
      isOn: false,
      tick: 0
    }
  })

  function onPlayerClick(row, column) {
    let nextTurn = oposite(turnState)

    if (!fieldState[row][column]?.key) {
      let updateFieldState = {
        ...fieldState,
        [row]: { ...fieldState[row], [column]: iconsDict[turnState] },
      }
      switch(activeMode) {
        case "koop":  setTurnState(nextTurn);
        case "pc": updateFieldState = pcTurn(fieldState, oposite(turnState))
      }

      setFieldState(updateFieldState);
    }
  }

  useEffect(() => {
    let opositTurn = oposite(turnState)
    let isWin = compareWin(fieldState, opositTurn);
    if (isWin === 'draw') {
      setDraw(true);
      setDialogOpen(true);
    } else if (isWin) {
      setCountWin((prevCount) => ({
        ...prevCount,
        [opositTurn]: prevCount[opositTurn]++,
      }));
      setDialogOpen(true);
    }
  }, [turnState]);

  useEffect(() => {
    const activeMode = gameParams.gameWith.find(mode=> mode.checked)
    setActiveMode(activeMode.key)
  }, [gameParams.gameWith])
  return (
    <Box>
      <Toolbar
      countWin={countWin} 
      iconsDict={iconsDict}
      turnState={turnState}
      />
      {!startGame ? <GameMenu menuTree={GameItems({
    navigate,
    setStartGame,
    gameParams,
    setGameParams
  })} /> : null}
      <Box
        sx={styles.field}
      >
        {buildFieldByCoords(
          fieldState,
          (col) => (
            <Box
              sx={styles.row}
            >
              {col}
            </Box>
          ),
          (row, colKey, rowKey) => {
            return (
              <Box
                onClick={() => onPlayerClick(colKey, rowKey)}
                sx={styles.col}
              >
                {row.value ? (
                  <img width="90%" height="90%" src={row.value} alt={row.key} />
                ) : (
                  ''
                )}
              </Box>
            );
          }
        )}
      </Box>
      <GameresultDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      turnState={turnState}
      setTurnState={setTurnState}
      setFieldState={setFieldState}
      setDraw={setDraw}
      fild={fild}
      iconsDict={iconsDict}
      draw={draw}
      countWin={countWin}
      />
    </Box>
  );
}

export default Game;
