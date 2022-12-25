import { Box } from "@mui/system"
import { addConfig } from "./addConfig"

type TControlProps = {
    adds: {
        img: Record<string, string[]>
        audio: Record<string, string[]>
    },
    showCount?: {
        img: number,
        audio: number
    },
    showMoreButton: boolean
}

function AddsViewer({adds, showCount, showMoreButton = true}: TControlProps) {
    return (
        <Box>
            {Object.keys(adds || {}).map(add => {
                return (
                    <Box>
                        {typeof addConfig[add] === 'function' ? 
                addConfig[add](adds[add], showCount, showMoreButton) :
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