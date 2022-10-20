import { randomUnit } from "../../../utils/utils"
import { forEachField } from "../../utils/fiels"


class PC {
    side
    fieldState
    stepCount = 0
    value
    iconsDict
    winCenter = false
    warnings = []
    constructor(side, fieldState, iconsDict) {
        this.side = side
        this.fieldState = fieldState
        this.iconsDict = iconsDict
    }

    columnIntoNextStep(col, nextTo) {
        const toCode = col.charCodeAt() + nextTo;
        return String.fromCharCode(toCode);
      }

    checkLeft(col, row) {
        const newRow = +row - 1
        const value = this.fieldState[col]?.[newRow]
        return this.makeCoordConfig('checkLeft', value, col, newRow)
    }

    checkRight(col, row) {
        const newRow = +row + 1
        const value = this.fieldState[col]?.[newRow]
        return this.makeCoordConfig('checkRight', value, col, newRow)
    }

    checkBottom(col, row) {
        const nextCol = this.columnIntoNextStep(col, +1);
        const value = this.fieldState[nextCol]?.[row]
        return this.makeCoordConfig('checkBottom', value, nextCol, row)
    }

    checkTop(col, row) {
        const nextCol = this.columnIntoNextStep(col, -1);
        const value = this.fieldState[nextCol]?.[row]
        return this.makeCoordConfig('checkTop', value, nextCol, row)
    }

    makeCoordConfig(item,value, col, row) {
      return  value ? {
            item: item,
            value,
            coords: {
                col,
                row
            }
        } : null
    }

    checkHorisontal(col, row) {
        let empty
        const isWarning = this.fieldState[col].filter((item, idx) => {
            if (!item.key) empty = idx
            return item.key
        })
        if (isWarning.length === 2) {
            this.warnings({
                col: empty,
                row:
            })
        }
    }
    checkVertical(col, row) {

    }
    checkLeftDiagonal(col, row) {

    }
    checkRightDiagonal(col, row) {

    }


    avalibleSteps() {
        const canStep = []
        const fieldState = this.fieldState
        function checkField(col, row) {
            if (col === "A") this.checkVertical(row)
            if (+row === 0) this.checkHorisontal(col)
            if (col === "A" && row === 0) this.checkLeftDiagonal(col, row)
            if (col === "A" && row === 2 ) this.checkRightDiagonal(col, row)
            if (!fieldState[col][row].key) {
                canStep.push({col, row})
            }
            return fieldState[col][row]
        }
    
        forEachField(this.fieldState, checkField)
        return canStep
    }

    onFirstStep() {
        if (this.fieldState['B']['1'].key) {
            this.onRandomDiagonal()
        } else {
            this.fieldState['B']['1'] = this.render
            this.winCenter = true
        }
    }

    onRandomDiagonal() {
        if (this.winCenter) {
            this.onDefence()
            return;
        }
        const diahonalVariants = [
            {col: 'A', row: 0},
            {col: 'A', row: 2},
            {col: 'C', row: 0},
            {col: 'C', row: 2},
        ]

    const randomIdx = randomUnit(0, diahonalVariants.length)
    const coords = diahonalVariants[randomIdx]
    this.fieldState[coords.col][coords.row] = this.render
    }

    onDefence() {
         const avalibleSteps = this.avalibleSteps()
        if (avalibleSteps.length) {
            // this.fieldState[isBlock[0].col][isBlock[0].row]
            let findStep = false
            avalibleSteps
        }

    }

    get render() {
        return {
            key: this.side,
            value: this.iconsDict[this.side].value
        }
    }

    stepTo(fieldState) {
        this.fieldState = fieldState
        switch(this.stepCount) {
            case 0: this.onFirstStep()
            break;
            case 1: this.onRandomDiagonal()
            break;
            default: this.onDefence() 
        }
        ++this.stepCount
        return this.fieldState
    }

}

export default PC