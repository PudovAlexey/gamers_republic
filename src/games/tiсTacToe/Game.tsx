import React, { useEffect, useState } from "react";
import Tic from "./assets/Tic.png";
import Tac from "./assets/Tac.png";
import { Alert, AlertTitle, Box, Toolbar, Typography } from "@mui/material";
import { buildFieldByCoords } from "../utils/fiels";
import DialogControl from "../../components/reusable/Dialog/DialogControl";
import ToolbarComponent from "../../components/reusable/ToolbarComponent/ToolbarComponent";
import { useNavigate } from "react-router-dom";
let fild = {
  A: { 1: {}, 2: {}, 3: {} },
  B: { 1: {}, 2: {}, 3: {} },
  C: { 1: {}, 2: {}, 3: {} },
};
let iconsDict = {
  X: { key: "X", value: Tic },
  O: { key: "O", value: Tac },
};

function compareWin(fieldState, turn) {
  let line = (key, all, item) =>
    all.filter((s) => s[key] === item[key]).length === 3;
  let isDraw = [];
  let allSteps = [];
  let steps = Object.keys(fieldState).reduce(
    (activeColumns, column, columnIdx) => {
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
      line("column", allSteps, step) || line("row", allSteps, step)
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
    return "draw";
  } else {
    return false;
  }
}
function Game() {
  let navigate = useNavigate();
  let [dialogOpen, setDialogOpen] = useState(false);
  let [draw, setDraw] = useState(false);
  let [fieldState, setFieldState] = useState(fild);
  let [turnState, setTurnState] = useState("X");
  let [players, setPlayers] = useState({
    O: { username: "darkStalker", avatar: "" },
    X: { username: "darkStalker", avatar: "" },
  });
  let [countWin, setCountWin] = useState({
    O: 0,
    X: 0,
  });

  let gameCount = (
    <Typography>
      <img
        style={{
          marginLeft: "10px",
        }}
        height="30px"
        width="30px"
        src={iconsDict["O"].value}
      />
      : {countWin["O"]}
      <img
        style={{
          marginLeft: "10px",
        }}
        height="30px"
        width="30px"
        src={iconsDict["X"].value}
      />
      : {countWin["X"]}
    </Typography>
  );
  let gameTurn = (text, isResult) => {
    let reverseState;
    if (isResult) reverseState = turnState === "X" ? "O" : "X";
    return (
      <Typography variant="h5">
        {text}: {""}
        <img
          style={{
            marginLeft: "10px",
          }}
          height="30px"
          width="30px"
          src={
            reverseState
              ? iconsDict[reverseState].value
              : iconsDict[turnState].value
          }
          alt={
            reverseState
              ? iconsDict[reverseState].value
              : iconsDict[turnState].key
          }
        />
      </Typography>
    );
  };
  function onStartNewGame() {
    let reverseState = turnState === "X" ? "O" : "X";
    setTurnState(reverseState);
    setFieldState(fild);
    setDialogOpen(false);
    setDraw(false);
  }

  function onOut() {
    setFieldState(fild);
    setDraw(false);
    setDialogOpen(false);
    navigate("/games");
  }

  function onPlayerClick(row, column) {
    let nextTurn = turnState === "X" ? "O" : "X";

    if (!fieldState[row][column]?.key)
      setFieldState((prevState) => ({
        ...prevState,
        [row]: { ...prevState[row], [column]: iconsDict[turnState] },
      }));

    setTurnState(nextTurn);
  }

  useEffect(() => {
    let opositTurn = turnState === "X" ? "O" : "X";
    let isWin = compareWin(fieldState, opositTurn);
    if (isWin === "draw") {
      setDraw(true);
      setDialogOpen(true);
      console.log("draw");
    } else if (isWin) {
      setCountWin((prevCount) => ({
        ...prevCount,
        [opositTurn]: prevCount[opositTurn]++,
      }));
      setDialogOpen(true);
    }
  }, [turnState]);
  return (
    <Box>
      <ToolbarComponent justifyContent="right" width="30%">
        {gameCount}
        {gameTurn("Now turn is")}
      </ToolbarComponent>
      <Box
        sx={{
          height: "100%",
          margin: "auto auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {buildFieldByCoords(
          fieldState,
          (col) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {col}
            </Box>
          ),
          (row, colKey, rowKey) => {
            return (
              <Box
                onClick={() => onPlayerClick(colKey, rowKey)}
                sx={{
                  border: "2px solid black",
                  width: "150px",
                  height: "150px",
                  alignContent: "center",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {row.value ? (
                  <img width="90%" height="90%" src={row.value} alt={row.key} />
                ) : (
                  ""
                )}
              </Box>
            );
          }
        )}
      </Box>
      <DialogControl
        dialogActions={[
          {
            text: "startNewGame",
            onClick: onStartNewGame,
          },
          {
            text: "Out",
            onClick: onOut,
          },
        ]}
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="the game was over"
      >
        <Box>
          <Typography variant="h5">
            {draw
              ? "The match ended in a draw"
              : gameTurn("At these match was win is", true)}
          </Typography>
          <Typography variant="h6">
            current game score is: {gameCount}
          </Typography>
        </Box>
      </DialogControl>
    </Box>
  );
}

export default Game;
