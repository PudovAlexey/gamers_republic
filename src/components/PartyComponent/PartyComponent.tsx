import React, {useEffect} from 'react'
import { useTheme } from "@emotion/react"
import { Dataset } from "@mui/icons-material"
import { Box, Button, Paper } from "@mui/material"
import { onMovePartyContainer } from "./animation/main"
import { partyParts } from "./config"
import { dinamicStyles, styleComponent } from "./styles"
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks'
import { setContainer } from './store'

function PartyComponent() { 
    const theme = useTheme()
    const styles = styleComponent(theme)
    const dispatch = useAppDispatch()
    const {activeContainer} = useAppSelector(actions => actions.partySlice)

    function onMoveStartMovePartyContainer(e, part) {
        const partyRootContainer = e.currentTarget.closest('#partyRoot')
        onMovePartyContainer(partyRootContainer, part)
    }

    return (
        <Box id="partyRoot" sx={styles.layout}>
            {
                Object.keys(partyParts).map((part, idx) => (
                    <Box data-partid={part} sx={styles.partyContainerItem}>
                        <Button onMouseDown={(e) => onMoveStartMovePartyContainer(e, part)} sx={{
                             ...styles.labelBtn,
                             ...dinamicStyles.activeLink(activeContainer === part),
                             top: (idx + 1) * 40 + 'px'
                        }} key={part}>{partyParts[part].icon}</Button>
                        <Paper  sx={styles.partyContainer}>
                        {partyParts[part].component}
                        </Paper>
                    </Box>
                ))
            }   
        </Box>
    )
}

export default PartyComponent