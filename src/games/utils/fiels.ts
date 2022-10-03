import { TField } from "./types"

export function buildFieldByCoords(fieldMap, renderCol, renderRow) {
    return  Object.keys(fieldMap).map((colKey, colIdx, cols) => {
        return  renderCol(
            Object.keys(fieldMap[colKey]).map((row, rowIdx) => {
                return (fieldMap[colKey][row], renderRow(fieldMap[colKey][row], colKey, row, colIdx, cols))
             }),
             colKey,
             colIdx,
             cols,
             Object.keys(fieldMap[colKey])
        )
        
    })
}

export function forEachField(field, action) {
    console.log('child')
    Object.keys(field).forEach(col => {
        Object.keys(field[col]).forEach(row => {
            field[col][row] = action(col, row)
        }) 
    })
    return field
}


export function makeField(field: TField, pattern: any = {}) {
    let startLetter = 65
    let __data = {
        "chees": {cols: 8, rows: 8},
        "tictactoe": {cols: 3, rows: 3}
    }
    let coords = typeof field === 'string' ? __data[field] : field

    let fieldMap = {}

    for(let i = 0; i < coords.cols ; i++) {
        fieldMap[String.fromCharCode(startLetter)] = new Array(coords.rows)
        .fill('')
        .reduce((cols, _, idx) => {
            cols[idx] = {}
            return cols
        }, {})
        startLetter++
    }

    return fieldMap

}