import { TextField } from "@mui/material"

function Timer({onChange, ...props}) {
    function onChangeValue(e) {
        const value = e.target.value
        let parsedValue = value.split().reduce((value, key, idx) => {
            if (value > 5) {
                value = false
            } else {
                value = idx === 2 ? value + ":" + key : value + key
            }
            return value
        }, "")
        if (value) onChange(parsedValue)
    }
    return (
        <TextField label="set timer" variant="filled" {...props} onChange={(e) => onChangeValue(e)} />
    )
}

export default Timer