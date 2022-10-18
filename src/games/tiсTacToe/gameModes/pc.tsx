import { forEachField } from "../../utils/fiels"

function checkLeft() {

}

function checkRight() {

}

function checkBottom() {

}

function checkTop() {

}



function isBetween(fieldState, side) {
    function getBetween(col, row) {
        return fieldState[col][row]
    }

    forEachField(fieldState, getBetween)
    return []
}

function pcTurn(fieldState, side) {
    const isBlock = isBetween(fieldState, side)
    if (isBlock.length) {
        fieldState[isBlock[0].col][isBlock[0].row]
    }
    return fieldState
}

export default pcTurn