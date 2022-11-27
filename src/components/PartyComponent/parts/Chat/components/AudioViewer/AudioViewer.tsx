import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { onExit, onInit } from "./store/playAudioSlice";

function AudioViewer({audio}) {
    const canvasEl = useRef()
    const audioEl = useRef()
    const dispatch = useAppDispatch()
    const {} = useAppSelector((actions) => actions.playAudioSlice)
    useEffect(() => {
        if (canvasEl.current) {
            dispatch(onInit({
                canvas: canvasEl
            }))
        }
        return () => {
            dispatch(onExit())
        }
    })

    function togglePlay() {

    }

    return (
        <Box>
            <IconButton onClick={togglePlay}>
                <PlayArrowIcon/>
            </IconButton>
           <Box>
           <audio ref={audioEl}>
                <source 
                type="audio/mp3"
                src={audio}
                >
                </source>
            </audio>
            <canvas ref={canvasEl} width={1200} height={250}></canvas>
           </Box>
           <Typography>0.00/1.15</Typography>
        </Box>
    )
}

export {
    AudioViewer
}