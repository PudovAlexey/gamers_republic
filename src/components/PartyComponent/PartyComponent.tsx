import { useTheme } from "@emotion/react"
import { Dataset } from "@mui/icons-material"
import { Box, Button, Paper } from "@mui/material"
import { partyParts } from "./config"
import { dinamicStyles, styleComponent } from "./styles"

function PartyComponent() {
    const active = "chat"
    const theme = useTheme()
    const styles = styleComponent(theme)

    function onMovePartyContainerPress(e) {
        console.log('click')
      let {dataset, style} = e.currentTarget
        style.right = '+50px'
        e.currentTarget.nextElementSibling.style.position = 'absolute !important'
        e.currentTarget.nextElementSibling.style.left = '+0px'
    }

    return (
        <Box sx={styles.layout}>
            {
                Object.keys(partyParts).map(part => (
                    <Box sx={styles.partyContainerItem}>
                        <Button data-hide="false" onClick={(e) =>onMovePartyContainerPress(e)} sx={{
                             ...styles,
                             ...dinamicStyles.activeLink(active === part)
                        }} key={part}>{partyParts[part].icon}</Button>
                        <Paper sx={styles.partyContainer}>
                        {partyParts[part].content}
                        </Paper>
                    </Box>
                ))
            }   
        </Box>
    )
}

export default PartyComponent