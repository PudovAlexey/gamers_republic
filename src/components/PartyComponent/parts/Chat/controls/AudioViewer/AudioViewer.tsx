import { IconButton, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { onExit, onInit, onStartPlayMusic } from "./store/playAudioSlice";
import { stylesComponent } from "./styles";

function AudioViewer({audio, id, items}) {
    const theme = useTheme()
    const styles = stylesComponent(theme)
    const dispatch = useAppDispatch()
    const container = items.current?.[id]
    const {audioControls} = useAppSelector((actions) => actions.playAudioSlice)
    useEffect(() => {
        if (container) {
            const canvas = container.querySelector('.viewer')
            dispatch(onInit({
                canvas: canvas,
                playerId: id
            }))
        }
        return () => {
            dispatch(onExit())
        }
    }, [container])

    function togglePlay() {
        if (container) {
            const player = container.querySelector('.player')
            console.log(player)
            dispatch(onStartPlayMusic({
                player: player,
                playerId: id
            }))
        }
    }

    return (
        <Box
        ref={el => items.current[id] = el}
         sx={styles.voiseBox}>
            <IconButton onClick={togglePlay}>
                {audioControls?.[id]?.play ? <PauseIcon/> : <PlayArrowIcon/>}
            </IconButton>
           <Box sx={styles.voiseProgress}>
           <audio className="player">
                <source 
                type="audio/mp3"
                src={audio}
                >
                </source>
            </audio>
            <canvas className="viewer" style={styles.canvas} width={"600"} height={"250"}></canvas>
           </Box>
           <Typography>0.00/1.15</Typography>
        </Box>
    )
}

export {
    AudioViewer
}