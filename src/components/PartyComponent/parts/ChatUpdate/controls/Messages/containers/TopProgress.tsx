import { CircularProgress } from "@mui/material"
import { useAppSelector } from "../../../../../../../hooks/typedReduxHooks"

function TopProgress() {
    const isActive = useAppSelector((actions) => actions.chatSlice.loadingTop)

    if (!isActive) return null
    return (
        <CircularProgress/>
    )
}

export {
    TopProgress
}