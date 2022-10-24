import React, { useEffect, useMemo, useState } from 'react';
import Tic from './assets/Tic.png';
import Tac from './assets/Tac.png';
import { Box } from '@mui/material';
import { buildFieldByCoords, forEachField, makeField } from '../utils/fiels';
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
import { compareWin, oposite } from './utils/utils';
import PC from './gameModes/pc';

const iconsDict = {
  X: { key: 'X', value: Tic },
  O: { key: 'O', value: Tac },
};
function Game() {
  const fild = useMemo(() => {
    return makeField(EField.TicTacToe)
  }, [])
  const theme = useTheme()
  const navigate = useNavigate();
  const styles = styleComponent(theme)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draw, setDraw] = useState(false);
  const [fieldState, setFieldState] = useState(fild);
  const [turnState, setTurnState] = useState('X');
  const [activeMode, setActiveMode] = useState(null)
  const [pc, setPc] = useState()
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
    if (pc && pc.think) {
      return
    }
    if (!fieldState[row][column]?.key) {
      let updateFieldState = {
        ...fieldState,
        [row]: { ...fieldState[row], [column]: iconsDict[turnState] },
      }
      switch(activeMode) {
        case "koop": switchTurnToAnotherUser(updateFieldState)
        case "pc": switchToPcTurn(updateFieldState)
      }
    }
  }

  function switchTurnToAnotherUser(updateFieldState) {
    let nextTurn = oposite(turnState)
    setTurnState(nextTurn);
    setFieldState(updateFieldState);
  }

  function switchToPcTurn(updateFieldState) {
    setFieldState(updateFieldState)
   setTurnState(oposite(turnState))
  pc.stepTo(JSON.parse(JSON.stringify(updateFieldState)))
  .then(afterPCPlay => {
    setFieldState({...afterPCPlay})
    setTurnState(turnState)
  })
  }

  useEffect(() => {
    let opositTurn = oposite(turnState)
    let compareResult = compareWin(fieldState, opositTurn, true);
    const result = compareResult.showResult()
    if (result === 'draw') {
      setDraw(true);
      setDialogOpen(true);
    } else if (result) {
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

  useEffect(() => {
    if (startGame && activeMode === 'pc' && dialogOpen === false) {
      const pc = new PC(oposite(turnState), fieldState, iconsDict)
      setPc(pc)
      const check = oposite(turnState)
      if (check === 'X') {
        pc.stepTo(JSON.parse(JSON.stringify(fieldState)))
        .then(firstStep => setFieldState(firstStep))
      }
    }
  }, [startGame, dialogOpen])
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
