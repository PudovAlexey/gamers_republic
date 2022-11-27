import { IconButton, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { onExit, onInit, onStartPlayMusic } from "./store/playAudioSlice";
import { stylesComponent } from "./styles";

function AudioViewer({audio}) {
    const theme = useTheme()
    const styles = stylesComponent(theme)
    const canvasEl = useRef()
    const audioEl = useRef()
    const dispatch = useAppDispatch()
    const {} = useAppSelector((actions) => actions.playAudioSlice)
    useEffect(() => {
        if (canvasEl.current) {
            dispatch(onInit({
                canvas: canvasEl.current
            }))
        }
        return () => {
            dispatch(onExit())
        }
    }, [])

    function togglePlay() {
        if (audioEl.current) {
            dispatch(onStartPlayMusic({
                player: audioEl.current
            }))
        }
    }

    return (
        <Box sx={styles.voiseBox}>
            <IconButton onClick={togglePlay}>
                <PlayArrowIcon/>
            </IconButton>
           <Box sx={styles.voiseProgress}>
           <audio ref={audioEl}>
                <source 
                type="audio/mp3"
                src={audio}
                >
                </source>
            </audio>
            <canvas style={styles.canvas} ref={canvasEl} width={"600"} height={"250"}></canvas>
           </Box>
           <Typography>0.00/1.15</Typography>
        </Box>
    )
}

export {
    AudioViewer
}