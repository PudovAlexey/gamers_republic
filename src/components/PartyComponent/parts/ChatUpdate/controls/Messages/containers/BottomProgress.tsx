import { CircularProgress } from "@mui/material"
import { useAppSelector } from "../../../../../../../hooks/typedReduxHooks"

function BottomProgress() {
    const isActive = useAppSelector((actions) => actions.chatSlice.loadingBottom)
    if (!isActive) return null
    return (
        <CircularProgress/>
    )
}

export {
    BottomProgress
}