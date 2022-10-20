import { randomUnit } from "../../../utils/utils"
import { forEachField } from "../../utils/fiels"
import { oposite } from "../utils/utils"


class PC {
    side
    fieldState
    stepCount = 0
    value
    iconsDict
    winCenter = false
    warnings = []
    opositeSide
    constructor(side, fieldState, iconsDict) {
        this.side = side
        this.fieldState = fieldState
        this.iconsDict = iconsDict
        this.opositeSide = oposite(side)
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

    checkHorisontal(col) {
        let empty
        const isWarning = Object.values(this.fieldState[col]).filter((item, idx) => {
            if (!item.key) empty = idx
            return item.key && this.isRival(item.key)
        }, this)
        if (isWarning.length === 2) {
            this.warnings.push({
                col: col,
                row: empty
            })
        }
    }
    checkVertical(row) {
        let empty
        const isWarning = Object.values(this.fieldState).filter((state, idx) => {
            if (!state[row].key) empty = String.fromCharCode(65 + idx)
            return state[row].key && this.isRival(state[row].key)
        }, this)
        if (isWarning.length === 2) {
            this.warnings.push({
                col: empty,
                row: row
            })
        }

    }
    checkDiagonal(row, oposite) {
        const checkVariants = Object.keys(this.fieldState).length
        let isWarning = []
        isWarning.length = checkVariants
        let calculate = 0
        // const fieldState = this.fieldState
        // const opositeSide = this.opositeSide
        const that = this
        let empty
         isWarning = isWarning.reduce((items, item) => {
            const parseCol = !oposite ? String.fromCharCode(65 + calculate) : String.fromCharCode(65 - calculate)
            const parseRow = !oposite ? +row + calculate : +row - calculate 
            if (!that.fieldState[parseCol][parseRow].key) empty = {
                col: parseCol,
                row: parseRow
            }
            that.fieldState[parseCol][parseRow].key &&
            that.isRival(that.fieldState[parseCol][parseRow].key)
              items.push(item)
           !oposite ? calculate++ : calculate--
            return items
         }, [])

         if (isWarning.length) {
            this.warnings.push(empty)
         }
    }


    avalibleSteps() {
        const canStep = []
        const fieldState = this.fieldState
        const that = this
        function checkField(col, row) {
            if (col === "A") that.checkVertical(row)
            if (+row === 0) that.checkHorisontal(col)
            if (col === "A" && row === 0) this.checkDiagonal(row)
            if (col === "A" && row === 2 ) this.checkDiagonal(row, true)
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
            this.onRandomVariant()
        } else {
            this.fieldState['B']['1'] = this.render
            this.winCenter = true
        }
    }

    onRandomVariant() {
        const isStep = this.onDefence()
        if (isStep) return
        const diahonalVariants = [
            {col: 'A', row: 1},
            {col: 'B', row: 0},
            {col: 'B', row: 2},
            {col: 'C', row: 1},
        ]

    const randomIdx = randomUnit(0, diahonalVariants.length - 1)
    const coords = diahonalVariants[randomIdx]
    this.fieldState[coords.col][coords.row] = this.render
    }

    onDefence() {
        if (this.warnings.length) {
            const warning = this.warnings.find(warning => warning.col !== undefined && warning.row !== undefined)
            if (warning) {
                this.fieldState[warning.col][warning.row] = this.render
                return true
            }
        } else {
            const avalibleSteps = this.avalibleSteps()
            // const randomIdx = randomUnit(0, diahonalVariants.length - 1)
            const randomIdx = randomUnit(0, avalibleSteps.length - 1)
            const coords = avalibleSteps[randomIdx]
            this.fieldState[coords.col][coords.row] = this.render
            return true
        }

    }

    get render() {
        return {
            key: this.side,
            value: this.iconsDict[this.side].value
        }
    }

    isRival(elem) {
        return elem === this.opositeSide
    }

    stepTo(fieldState) {
        this.fieldState = fieldState
        switch(this.stepCount) {
            case 0: this.onFirstStep()
            break;
            case 1: this.onRandomVariant()
            break;
            default: this.onDefence() 
        }
        ++this.stepCount
        this.warnings = []
        return this.fieldState
    }

}

export default PC