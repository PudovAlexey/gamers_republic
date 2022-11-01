import { forEachField } from '../../utils/fiels';
import { EFieldParams, EGameItems } from '../ts/enums';
import { TCoords, TGameField } from '../ts/types';

export function oposite(oposite: EGameItems): EGameItems {
  return oposite === EGameItems.X ? EGameItems.O : EGameItems.X;
}

export function checkValid(
  value: string | number,
  type: EFieldParams
): boolean {
  const __data = {
    col: ['A', 'B', 'C'],
    row: [1, 2, 3],
  };

  return __data[type].some((e) => e === value);
}

export function compareWin(
  fieldState: TGameField,
  turn: EGameItems,
  checkWin: boolean
) {
  let vertical: TCoords[] = [];
  let horisontal: TCoords[] = [];
  const diagonalLeft: TCoords[] = [];
  const diagonalRight: TCoords[] = [];
  let checkHorisontal: TCoords['col'] = 'A';
  let checkVertical: number = 0;
  let startDiagonalLeft: number = 0;
  let startDiagonalRight: number = 2;
  let startDiagonalRightCol: number = 0;
  let isDraw: boolean = true;
  const checkCount: number = checkWin ? 3 : 2;
  const compareField = (col, row) => {
    const coords = {
      col,
      row,
    };
    if (
      +row === 0 &&
      horisontal.length !== checkCount &&
      col !== 'A' &&
      checkValid(
        String.fromCharCode(checkHorisontal.charCodeAt(0) + 1),
        EFieldParams.Col
      )
    ) {
      horisontal = [];
      checkHorisontal = String.fromCharCode(
        checkHorisontal.charCodeAt(0) + 1
      ) as TCoords['col'];
    }

    if (col === checkHorisontal && turn === fieldState[col][row].key) {
      horisontal.push(coords);
    }
    if (+row === checkVertical && vertical.length !== checkCount) {
      vertical = [];
      for (let i = 0; i <= 2; i++) {
        let charCode = 65 + i;
        const coords: TCoords = {
          col: String.fromCharCode(charCode) as TCoords['col'],
          row,
        };
        fieldState[coords.col][coords.row].key === turn &&
          vertical.push(coords);
      }
      checkVertical++;
    }
    if (
      startDiagonalLeft === +row &&
      col === String.fromCharCode(startDiagonalLeft + 65) &&
      turn === fieldState[col][row].key
    ) {
      diagonalLeft.push(coords);
      startDiagonalLeft++;
    }
    if (
      startDiagonalRight === +row &&
      col === String.fromCharCode(startDiagonalRightCol + 65) &&
      turn === fieldState[col][row].key
    ) {
      diagonalRight.push(coords);
      startDiagonalRight--;
      startDiagonalRightCol++;
    }
    if (!fieldState[col][row].key) {
      isDraw = false;
    }
    return fieldState[col][row];
  };

  forEachField(fieldState, compareField);
  const compareResults = {
    vertical,
    horisontal,
    diagonalLeft,
    diagonalRight,
  };
  function isWin() {
    return Object.values(compareResults)
    .some((result) => result.length === 3);
  }

  return {
    showResult: function () {
      if (isWin()) {
        return isWin();
      } else if (isDraw) {
        return 'draw';
      }
    },
    showCoordinates: function () {
      return compareResults;
    },
  };
}
