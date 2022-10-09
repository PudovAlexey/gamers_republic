import { useEffect, useState } from "react";
import { buildFieldByCoords, forEachField, makeField } from "../utils/fiels";
import { EField } from "../utils/types";
import Black from "./assets/black.png";
import Red from "./assets/red.png";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import Figure from "./elements/Figure";
import Queen from "./elements/Queen";
import { QueenTests } from "./tests/Queen";
import ToolbarComponent from "../../components/reusable/ToolbarComponent/ToolbarComponent";
import GameMenu from "../reusable/GameMenu";
import {gameMenu, MenuItems} from "./GameMenu";
import { useNavigate } from "react-router-dom";

let field = makeField(EField.Chees);

function onFillBoard(field, gameParams) {
  let { side, firstStep } = gameParams;
  return forEachField(field, (col, row) => {
    let playerColor = null;
    let sSide;
    if (col.charCodeAt() <= 67) {
      playerColor = side.top;
      sSide = -1;
    } else if (col.charCodeAt() >= 70) {
      playerColor = side.bottom;
      sSide = 1;
    }

    let rowAdd = col.charCodeAt() % 2 === 0 ? row % 2 === 0 : row % 2 !== 0;
    if (rowAdd && playerColor) {
      const colorToPlay = playerColor === "Red" ? "bottom" : "top";
      let figure = new Figure({ col, row }, playerColor, sSide, field);
      return { ...figure.render(), figure };
      // return {key: "test"}
    } else {
      return {};
    }
  });
}

function Game() {
  let [fieldState, setFieldState] = useState(field);
  let [startGame, setStartGame] = useState(false);
  let [stepTimer, setStepTimer] = useState(0);
  let [figuresRemaining, setFiguresRemaining] = useState({
    Red: { key: Red, count: 0 },
    Black: { key: Black, count: 0 },
  });
  let [turn, setTurn] = useState("Red");
  let [activeFigure, setActiveFigure] = useState(null);
  let [gameParams, setGameParams] = useState({
    side: {
      top: "Black",
      bottom: "Red",
    },
    firstStep: "Black",
  });
  const navigate = useNavigate()
  const menuItems = gameMenu({setStartGame, navigate})
  useEffect(() => {
    // let fillBoard = onFillBoard(field, gameParams);
    const test =  QueenTests(field, gameParams)
    setFieldState(test);
  }, [startGame]);

  function onPlayerClick(figure, col, row, eatContinue) {
    if (figure && fieldState[col][row].key) {
      const isPlayerCanGo = turn === figure.getColor;
      setActiveFigure(figure);
      if (!isPlayerCanGo) return;
      let avalibleState = figure.lightAvalibleFields(eatContinue);
      setFieldState({...avalibleState});
    }
  }

  function onFigureGo(col, row) {
    if (activeFigure && !fieldState[col][row].key) {
      let { stepTo, isWasEat, changeChoice, coords, isNotStep } = activeFigure.stepTo(
        col,
        row,
        activeFigure
      );
      if (changeChoice || isNotStep) return;
      if (stepTo[coords.col][coords.row].updateToQueen) {
        let toQueen = stepTo[coords.col][coords.row].figure;
        delete stepTo[coords.col][coords.row].updateToQueen;
        const queen = new Queen(
          toQueen.color,
          toQueen.coords,
          toQueen.fieldState
        );
        stepTo[coords.col][coords.row] = queen.render();
        stepTo[coords.col][coords.row].figure = queen;
      }
      if (typeof isWasEat === "boolean" && !isWasEat) {
        let avalibleTurns = turn === "Red" ? "Black" : "Red";
        setFieldState(stepTo);
        setTurn(avalibleTurns);
      } else {
        onPlayerClick(
          stepTo[coords.col][coords.row].figure,
          coords.col,
          coords.row,
          true
        );
        if (
          stepTo[coords.col][coords.row].figure.lights &&
          !stepTo[coords.col][coords.row].figure.lights.length
        ) {
          let avalibleTurns = turn === "Red" ? "Black" : "Red";
          setTurn(avalibleTurns);
        }
        return;
      }
      setActiveFigure(null);
    }
  }

  return (
    <Box>
      <ToolbarComponent justifyContent="right" width="30%">
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{figuresRemaining["Red"].count}</Typography>
          <img
            height="30px"
            width="30px"
            src={figuresRemaining["Red"].key}
            alt="Red"
          />
          :<Typography>{figuresRemaining["Black"].count}</Typography>
          <img
            height="30px"
            width="30px"
            src={figuresRemaining["Black"].key}
            alt="Black"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Now turn is:</Typography>
          <img
            height="30px"
            width="30px"
            src={figuresRemaining[turn].key}
            alt={turn}
          />
        </Box>
      </ToolbarComponent>
      {
        !startGame ?
        <GameMenu menuTree={menuItems}/> :
        null
      }
      {buildFieldByCoords(
        fieldState,
        (col, key, colIdx, cols, row) => (
          <>
            <Box
              key={row}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {key}
              {col}
            </Box>
            <Box
              key={`${colIdx}_${row}`}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {colIdx === cols.length - 1 &&
                row.map((i) => (
                  <Box
                    sx={{
                      width: "60px",
                      alignContent: "center",
                      background: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {i}
                  </Box>
                ))}
            </Box>
          </>
        ),
        (row, colKey, rowKey, colIdx, cols) => {
          let isBlack =
            colKey.charCodeAt() % 2 === 0 ? rowKey % 2 === 0 : rowKey % 2 !== 0;
          let coloredBoard = isBlack ? "black" : "";
          return (
            <Box
              onClick={() => onFigureGo(colKey, rowKey)}
              key={`row_${rowKey}_${colIdx}`}
              sx={{
                backgroundColor: row.light
                  ? `${row.light} !important`
                  : `${coloredBoard} !important`,
                border: "2px solid black",
                width: "60px",
                height: "60px",
                alignContent: "center",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {row.key ? (
                <img
                  onClick={() => onPlayerClick(row.figure, colKey, rowKey)}
                  width={"50px"}
                  height={"50px"}
                  src={row.value}
                  alt={row.key}
                />
              ) : null}
              {/* {row.key} */}
            </Box>
          );
        }
      )}
    </Box>
  );
}

export default Game;
