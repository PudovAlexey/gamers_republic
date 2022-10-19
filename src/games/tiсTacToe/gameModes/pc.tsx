import { randomUnit } from "../../../utils/utils"
import { forEachField } from "../../utils/fiels"


class PC {
    side
    fieldState
    stepCount
    value
    constructor(side, fieldState) {
        this.side = side
        this.fieldState = fieldState
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

    avalibleSteps() {
        const canStep = []
        const fieldState = this.fieldState
        function getBetween(col, row) {
            if (!fieldState[col][row].key) {
                canStep.push({col, row})
            }
            return fieldState[col][row]
        }
    
        forEachField(this.fieldState, getBetween)
        return canStep
    }

    onFirstStep() {
        if (this.fieldState['A']['1'].key) {
            this.onRandomDiagonal()
        } else {
            this.fieldState['A']['1'] = {
                key: 'O',
                value: this.value
            }
        }
    }

    onRandomDiagonal() {
        const diahonalVariants = [
            {col: 'A', row: 0},
            {col: 'A', row: 2},
            {col: 'C', row: 0},
            {col: 'C', row: 2},
        ]

    const randomIdx = randomUnit(0, diahonalVariants.length)
    const coords = diahonalVariants[randomIdx]
    this.fieldState[coords.col][coords.row]        
    }

    onStep() {

    }

    stepTo(fieldState) {
        this.fieldState = fieldState
        switch(this.stepCount) {
            case 0: this.onFirstStep()
            case 1: this.onRandomDiagonal()
            default: onStep() 
        }
        // const avalibleSteps = this.avalibleSteps()
        // if (avalibleSteps.length) {
        //     // this.fieldState[isBlock[0].col][isBlock[0].row]
        //     avalibleSteps.forEach(step => {
        //         let checkWarning = [
        //             this.checkLeft(step.col, step.row),
        //             this.checkRight(step.col, step.row),
        //             this.checkBottom(step.col, step.row),
        //             this.checkTop(step.col, step.row),
        //         ]

        //         checkWarning = checkWarning.reduce((completeWarnings, warning) => {
        //             if (!warning) {
        //                 return completeWarnings
        //             }
        //             if (warning.item === 'checkLeft' || warning.item === 'checkRight') {
        //                 const topBottom = [
        //                     this.checkTop(warning.coords.col, warning.coords.row),
        //                     this.checkBottom(warning.coords.col, warning.coords.row)
        //                 ] 
        //                 topBottom.forEach(candidate => candidate && completeWarnings.push(candidate))
        //             } else if (warning.item === 'checkTop' || warning.item === 'checkBottom') {
        //                 const leftRight = [
        //                     this.checkLeft(warning.coords.col, warning.coords.row),
        //                     this.checkRight(warning.coords.col, warning.coords.row)
        //                 ] 
        //                 leftRight.forEach(candidate => candidate && completeWarnings.push(candidate))

        //             }
        //             completeWarnings.push(warning)
        //             return completeWarnings
        //         }, [], this)

               
            // }, this)
        // }

        return this.fieldState
    }

}

export default PC