import React, { useEffect, useMemo, useState, useContext } from 'react';
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
import PC from './gameModes/pc/pc';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import { TGameField, TGamersConfig, TIconsDict } from './ts/types';
import { EGameItems } from './ts/enums';
import { EGameModes } from './ts/enums';
import { createPc, switchToPcTurn } from './gameModes/pc/services/pcHelper';
import { switchStepToRival } from './gameModes/online/services/onlineHelper';
import { switchTurnToAnotherUser } from './gameModes/koop/services/koopHelper';

const iconsDict: TIconsDict = {
  X: { key: EGameItems.X, value: Tic },
  O: { key: EGameItems.O, value: Tac },
};
function Game() {
  const fild = useMemo(() => {
    return makeField(EField.TicTacToe);
  }, []);
  const [AuthUser] = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = styleComponent(theme);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);
  const [fieldState, setFieldState] = useState<TGameField>(fild);
  const [turnState, setTurnState] = useState<EGameItems>(EGameItems.X);
  const [activeMode, setActiveMode] = useState<EGameModes | null>(null);
  const [pause, setPause] = useState<boolean>(false);
  const [pc, setPc] = useState(null);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [countWin, setCountWin] = useState<TGamersConfig>({
    me: {
      key: EGameItems.X,
      countWin: 0,
      data: {
        username: AuthUser?.username,
        avatar: AuthUser?.avatar,
      },
    },
    rival: {
      key: EGameItems.O,
      countWin: 0,
      data: {
        username: '',
        avatar: '',
      },
    },
  });
  useEffect(() => {
      setCountWin((prev) => ({
        ...prev,
        me: {...prev.me, data: AuthUser}
      }))
  }, [AuthUser]);

  const [gameParams, setGameParams] = useState({
    gameWith: [
      {
        key: EGameModes.Pc,
        value: ComputerIcon,
        checked: true,
      },
      {
        key: EGameModes.Koop,
        value: GroupIcon,
      },
      {
        key: EGameModes.Online,
        value: CompassCalibrationIcon,
      },
    ],
    timer: {
      isOn: false,
      tick: 0,
    },
  });

  function onPlayerClick(row, col) {
    const coords = { row, col };
    switch (activeMode) {
      case EGameModes.Koop:
        switchTurnToAnotherUser({
          turnState,
          setTurnState,
          setFieldState,
          fieldState,
          iconsDict,
          coords,
        });
        break;
      case EGameModes.Pc:
        switchToPcTurn({
          setFieldState,
          setTurnState,
          fieldState,
          iconsDict,
          coords,
          turnState,
          pc,
        });
        break;
      case EGameModes.Online:
        switchStepToRival(coords);
    }
  }

  useEffect(() => {
    let whiIsWin = null
    let changeTurn: boolean = false
    let opositTurn = oposite(turnState);
    let compareResult = compareWin(fieldState, opositTurn, true);
    const result = compareResult.showResult();
    if (result === 'draw') {
      changeTurn = true
      setDraw(true);
      setDialogOpen(true);
    } else if (result) {
      changeTurn = true
      whiIsWin = Object.keys(countWin).find(
        (isWinKey) => countWin[isWinKey].key == opositTurn
      );
      setDialogOpen(true);
    }
    if (!changeTurn) {
      return;
    }
    let renders = 0
    setCountWin((prev) => {
      if (renders > 0) {
        return prev
      }
      let next
      const reverseDatas = Object.keys(prev)
      next = prev[reverseDatas[0]].key
      prev[reverseDatas[0]].key = prev[reverseDatas[1]].key
      prev[reverseDatas[1]].key = next
      
      if (whiIsWin) {
        prev[whiIsWin].countWin++
      }
      renders++
      return {
        ...prev
      }
    });
  }, [turnState]);

  useEffect(() => {
    const activeMode = gameParams.gameWith.find((mode) => mode.checked);
    setActiveMode(activeMode.key);
  }, [gameParams.gameWith]);

  useEffect(() => {
    switch (activeMode) {
      case EGameModes.Pc:
        createPc({
          dialogOpen,
          activeMode,
          startGame,
          turnState,
          setFieldState,
          fieldState,
          iconsDict,
          setPc,
          setCountWin
        });
        break;
      case EGameModes.Online:
        break;
      case EGameModes.Koop:
        break;
    }
  }, [startGame, dialogOpen]);

  return (
    <Box>
      <Toolbar
        setPause={setPause}
        countWin={countWin}
        iconsDict={iconsDict}
        turnState={turnState}
      />
      {!(!startGame || pause) ? null : (
        <GameMenu
          menuTree={GameItems({
            navigate,
            setStartGame,
            gameParams,
            setGameParams,
            pause,
            setPause,
          })}
        />
      )}
      <Box sx={styles.field}>
        {buildFieldByCoords(
          fieldState,
          (col) => (
            <Box sx={styles.row}>{col}</Box>
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
