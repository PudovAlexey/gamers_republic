export function buildFieldByCoords(fieldMap, renderCol, renderRow) {
    return  Object.keys(fieldMap).map((colKey, colIdx) => {
        return  renderCol(
            Object.keys(fieldMap[colKey]).map((row, rowIdx) => {
                return (fieldMap[colKey][row], renderRow(fieldMap[colKey][row], colIdx, rowIdx))
             })
        )
        
    })

}