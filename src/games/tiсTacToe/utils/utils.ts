import { forEachField } from "../../utils/fiels";

export function oposite(oposite) {
    return oposite === 'X' ? 'O' : 'X';
}

export function compareWin(fieldState, turn, checkWin) {
    let vertical = []
    let horisontal = []
    const diagonalLeft = []
    const diagonalRight = []
    let checkHorisontal = 'A'
    let checkVertical = 0
    let startDiagonalLeft = 0
    let startDiagonalRight = 2
    let isDraw = true
    const checkCount = checkWin ? 3 : 2
    const compareField = (col, row) => {
      const coords = {
        col,
        row
      }
      if (+row === 0 && horisontal.length !== checkCount && col !== 'A') {
        horisontal = []
        checkHorisontal = String.fromCharCode(checkHorisontal.charCodeAt() + 1)
      }
  
      if (col === checkHorisontal && turn === fieldState[col][row].key) {
        horisontal.push(coords)
      } if (+row === checkVertical && vertical.length !== checkCount) {
        vertical = []
        for (let i = 0; i <= 2; i++) {
            let charCode = 65 + i
            const coords = {
                col: String.fromCharCode(charCode), 
                row
            } 
           fieldState[coords.col][coords.row].key === turn && vertical.push(coords)
        }
        checkVertical++
      } if (startDiagonalLeft === +row && col === String.fromCharCode(startDiagonalLeft + 65) && turn === fieldState[col][row].key) {
        diagonalLeft.push(coords)
        startDiagonalLeft++
      } if (startDiagonalRight === +row && col === String.fromCharCode(startDiagonalRight + 65) && turn === fieldState[col][row].key) {
        diagonalRight.push(coords)
        startDiagonalRight--
      } if (!fieldState[col][row].key) {
        isDraw = false
      }
      return fieldState[col][row]
    }
  
    forEachField(fieldState, compareField)
    const compareResults = {
      vertical,
      horisontal,
      diagonalLeft,
      diagonalRight
}
    function isWin() {
      return Object.values(compareResults).some(result => result.length === 3)
    }


    return {
        showResult: function() {
        if (isWin()) {
        return isWin() 
        } else if (isDraw) {
        return 'draw'
        }
        },
        showCoordinates: function() {
            return compareResults
        }
    }
  }