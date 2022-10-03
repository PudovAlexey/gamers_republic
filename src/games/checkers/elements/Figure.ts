import Black from "../assets/black.png"
import Red from "../assets/red.png"

class Figure {
    private figures = {
        Red,
        Black
    }
    private lights = []
    constructor(coords, color, side, fieldState) {
        this.side = side
        this.coords = coords
        this.color = color
        this.fieldState = fieldState
    }


    columnIntoNextStep(col, nextTo) {
        const toCode = col.charCodeAt() + nextTo
        return String.fromCharCode(toCode)
    }

    get getColor() {
        return this.color
    }

    canEat(col, row) {

    }

    canLight(col, row) {
        return this.fieldState[col] && this.fieldState[col][row] && !this.fieldState[col][row]?.key
    }

    fromLeftTop(col, row) {
        const nextCol = this.columnIntoNextStep(col, -this.side || +1)

        return {
            key: "fromLeftTop",
            value: this.fieldState[nextCol] && this.fieldState[nextCol][+row - 1],
            coords: {
                col: nextCol,
                row: +row - 1
            }
        }
    }

    fromRightTop(col, row) {
        const nextCol = this.columnIntoNextStep(col, -this.side || +1)

        return {
            key: "fromRightTop",
            value: this.fieldState[nextCol] && this.fieldState[nextCol][+row + 1],
            coords: {
                col: nextCol,
                row: +row + 1
            }
        }
    } 

    fromRightBottom(col, row) {
        const nextCol = this.columnIntoNextStep(col, +this.side || -1)

        return {
            key: "fromRightBottom",
            value: this.fieldState[nextCol] && this.fieldState[nextCol][+row + 1],
            coords: {
                col: nextCol,
                row: +row + 1
            }
        }
        
    } 
    fromLeftBottom(col, row) {
        const nextCol = this.columnIntoNextStep(col, +this.side || -1)

        return {
            key: "fromLeftBottom",
            value: this.fieldState[nextCol] && this.fieldState[nextCol][+row - 1],
            coords: {
                col: nextCol,
                row: +row - 1
            }
        }
    } 

    hasEat(col, row) {
        let isEat = [
            this.fromLeftTop(col,row),
            this.fromRightTop(col,row),
            this.fromRightBottom(col,row),
            this.fromLeftBottom(col,row),
        ]
        const isMustEat = []
        const isEatVariants =  isEat.filter(i => i?.value?.key && i?.value?.key !== this.color, this)
        isEatVariants.forEach(eatVariant => {
            let getNextStepByEat = this[eatVariant.key](eatVariant.coords.col, eatVariant.coords.row)
            // this.fieldState[getNextStepByEat.coords.col][getNextStepByEat.coords.row].li
            if (this.canLight(getNextStepByEat.coords.col, getNextStepByEat.coords.row)) {
                isMustEat.push(getNextStepByEat)
                this.fieldState[getNextStepByEat.coords.col][getNextStepByEat.coords.row].light = 'red'
                this.lights.push({
                    col: getNextStepByEat.coords.col,
                    row: getNextStepByEat.coords.row,
                    eat: eatVariant
                })        
            }   
        }, this)

        return  isMustEat
    }

    forEachField(action) {
        const that = this
        Object.keys(this.fieldState).forEach(colKey => {
            Object.keys(that.fieldState[colKey]).forEach(rowKey => {
                action(that.fieldState[colKey][rowKey], colKey, rowKey)
            })
        })
    }

    lightAvalibleFields(eatContinue) { 
        let {col, row} = this.coords
        const clearLights = (column) => delete column.light 
        this.forEachField(clearLights)
        const isMustEat = this.hasEat(col, row)
            if (isMustEat.length) {
                return this.fieldState
            }
        if (eatContinue) return this.fieldState
        let canStep = [
            this.fromLeftTop(col, row),
            this.fromRightTop(col, row)
        ]
        canStep.forEach(step => {
            if (this.canLight(step.coords.col, step.coords.row)) {
                this.fieldState[step.coords.col][step.coords.row].light = 'red'
                this.lights.push({
                                    col: step.coords.col,
                                    row: step.coords.row
                                })
            }
        }, this)
        return this.fieldState
    }

    stepTo(col,row, activeFigure) { 
        if (this.fieldState[col][row].key) {
            return {changeChoice: true}
        }
        let isWasEat = false
        let isAvalibleField =  this.lights.find(light => light.col === col && +light.row === +row)
        if (isAvalibleField) {
            const isEatAportunaty = (column, col, row) => {
                const isMustEat = [
                    this.fromLeftTop(col, row),
                    this.fromRightTop(col, row),
                    this.fromLeftBottom(col, row),
                    this.fromRightBottom(col, row)
                ]
                const onTarget = this.fieldState[col][row]
                isMustEat.forEach(inAim => {
                    if (
                        typeof inAim?.value?.key === 'string' && 
                        this.fieldState[col][row].key && 
                        inAim?.value?.key !== this.fieldState[col][row].key &&
                        JSON.stringify(this.coords) !== JSON.stringify(this.fieldState[col][row].figure.coords)
                        ) {
                        const {col, row} = inAim.coords
                        if (this[inAim.key](col, row) && this[inAim.key](col, row).key)   {
                            this.fieldState[col][row] = {}
                        }
                    }
                }, this)
            }
            this.forEachField(isEatAportunaty)
            let {col: oldCol, row: oldRow} = this.coords
            this.fieldState[oldCol][oldRow] = {}
            let {key, value} = this.render()
             this.fieldState[col][row] = {
                figure: activeFigure,
                key,
                value
            } 
            const makeQueen = !this.fieldState[this.columnIntoNextStep(col, -this.side)]
            this.coords = {
                row,
                col
            }
            if (makeQueen) {
                this.fieldState[col][row].updateToQueen = true
            }
            this.lights.forEach(light => {
                if (this.fieldState[light.col] && this.fieldState[light.col][light.row]) delete this.fieldState[light.col][light.row].light
                if (light.eat) {
                    isWasEat = true
                    this.fieldState[light.eat.coords.col][light.eat.coords.row] = {}
                }
            })
            this.lights = []
            const updatedField = this.fieldState[col][row]
        }
        return {
            stepTo: this.fieldState,
            coords: this.coords, 
            isWasEat
        }
    }

    render() {
        return {
            key: this.color,
            value: this.figures[this.color],
        }
    }
}

export default Figure