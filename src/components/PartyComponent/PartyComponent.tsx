import React, { useContext, useEffect } from 'react'
import { useTheme } from "@emotion/react"
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import { onMovePartyContainer } from "./animation/main"
import { partyParts } from "./config"
import { dinamicStyles, styleComponent } from "./styles"
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks'
import { fetchMessages, init } from './store'
import { AuthContext } from '../AuthContext/AuthContext'

function PartyComponent() { 
    const theme = useTheme()
    const styles = styleComponent(theme)
    const [AuthUser] = useContext(AuthContext);
    const activeContainer = useAppSelector(actions => actions.partySlice.activeContainer)
    const dispatch = useAppDispatch()


    async function onInit(roomId) {
        dispatch(fetchMessages({
            roomId
        }))
        
    }
    
    useEffect(() => {
        if (AuthUser && AuthUser?.roomId) {
            dispatch(init({
                roomId: AuthUser.roomId
            }))
            onInit(AuthUser.roomId)
        }
    }, [AuthUser])
    function onMoveStartMovePartyContainer(e, part) {
        const partyRootContainer = e.currentTarget.closest('#partyRoot')
        onMovePartyContainer(partyRootContainer, part)
    }

    return (
        <Box id="partyRoot" sx={styles.layout}>
            {
                Object.keys(partyParts).map((part, idx) => (
                    <Box key={part} data-partid={part} sx={{
                        ...styles.partyContainerItem,
                        transform: part === 'chat' ? "translate(-35rem)" : "translate(0rem)"
                    }}>
                        <Button onMouseDown={(e) => onMoveStartMovePartyContainer(e, part)} sx={{
                             ...styles.labelBtn,
                             ...dinamicStyles.activeLink(activeContainer === part),
                             top: (idx + 1) * 40 + 'px'
                        }} key={part}>{partyParts[part].icon}</Button>
                        <Paper  sx={styles.partyContainer}>
                            <Typography sx={styles.partyContainerTitle} variant='h3'>{partyParts[part].label}</Typography>
                            <Divider/>
                        {partyParts[part].component}
                        </Paper>
                    </Box>
                ))
            }   
        </Box>
    )
}

export default PartyComponent