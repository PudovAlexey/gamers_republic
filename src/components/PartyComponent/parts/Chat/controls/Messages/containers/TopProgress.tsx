import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useAppSelector } from "../../../../../../../hooks/typedReduxHooks"

function TopProgress() {
    const isActive = useAppSelector((actions) => actions.chatSlice.loadingTop)

    // if (!isActive) return null
    return (
        <Box height={'5px'}>
             {isActive && <LinearProgress/>}
        </Box>
    )
}

export {
    TopProgress
}