import { useState } from "react"

function useFormatter(val, setVal, toFormat) {
    let [value, setValue] = useState()
    let [formatValue, setFormatValue] = useState(toFormat(val))
    return [
        value,
        setValue,
        formatValue,
    ]
}