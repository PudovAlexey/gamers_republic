import { useTheme } from "@emotion/react"
import { Dataset } from "@mui/icons-material"
import { Box, Button, Paper } from "@mui/material"
import { onMovePartyContainer } from "./animation/main"
import { partyParts } from "./config"
import { dinamicStyles, styleComponent } from "./styles"

function PartyComponent() {
    const active = "chat"
    const theme = useTheme()
    const styles = styleComponent(theme)

    function onMovePartyContainerPress(e) {
      const partyRootContainer = e.currentTarget.closest('#partyRoot')
      onMovePartyContainer(partyRootContainer, 'click')
    }

    function onMoveStartMovePartyContainer(e) {
        const partyRootContainer = e.currentTarget.closest('#partyRoot')
        onMovePartyContainer(partyRootContainer, 'drug')
    }

    return (
        <Box id="partyRoot" sx={styles.layout}>
            {
                Object.keys(partyParts).map(part => (
                    <Box data-active={active === part} sx={styles.partyContainerItem}>
                        <Button onMouseDown={onMoveStartMovePartyContainer} onMouseUp={onMovePartyContainerPress} sx={{
                             ...styles,
                             ...dinamicStyles.activeLink(active === part)
                        }} key={part}>{partyParts[part].icon}</Button>
                        <Paper  sx={styles.partyContainer}>
                        {partyParts[part].content}
                        </Paper>
                    </Box>
                ))
            }   
        </Box>
    )
}

export default PartyComponent