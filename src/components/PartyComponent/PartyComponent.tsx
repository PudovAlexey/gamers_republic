import { Box, Button } from "@mui/material"
import { partyParts } from "./config"

function PartyComponent() {
    const active = "Chat"
    return (
        <Box>
            {
                Object.keys(partyParts).map(part => (
                    <Button key={part}>{partyParts[part].label}</Button>
                ))
            }
        </Box>
    )
}

export default PartyComponent