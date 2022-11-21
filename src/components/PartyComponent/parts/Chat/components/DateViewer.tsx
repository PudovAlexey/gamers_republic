import React from "react"
import { Box } from "@mui/system"
import { styleComponent } from "../styles"
import { Typography, useTheme } from "@mui/material"

function DateViewer({
    prevMessageDate = null, 
    message, 
    nextMessageDate = null
}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.dateViewer}>
            <Typography sx={styles.monthText}>9 October</Typography>
        </Box>
    )

}

export {
    DateViewer
}