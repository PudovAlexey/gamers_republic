import { Box } from "@mui/system"
import { addConfig } from "./addConfig"

type TControlProps = {
    adds: {
        img: Record<string, string[]>
        audio: Record<string, string[]>
    }
}

function AddsViewer({adds}: TControlProps) {
    return (
        <Box>
            {Object.keys(adds || {}).map(add => {
                return (
                    <Box>
                        {typeof addConfig[add] === 'function' ? 
                addConfig[add](adds[add]) :
                null
            }
                    </Box>
                )
            })}
        </Box>
    )
}

export {
    AddsViewer
}