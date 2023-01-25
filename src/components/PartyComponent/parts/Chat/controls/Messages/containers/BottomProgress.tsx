import { Box, LinearProgress } from "@mui/material"
import { useAppSelector } from "../../../../../../../hooks/typedReduxHooks"

function BottomProgress() {
    const isActive = useAppSelector((actions) => actions.chatSlice.loadingBottom)
    return (
        <Box height={'5px'}>
             {isActive && <LinearProgress/>}
        </Box>
    )
}

export {
    BottomProgress
}