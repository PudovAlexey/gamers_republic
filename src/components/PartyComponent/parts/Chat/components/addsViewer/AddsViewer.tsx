import { Box } from "@mui/system"

function AddsViewer({adds}) {
    console.log(adds)
    return (
        <audio
        controls
        >
        <source type="audio/mp3" src={adds['audio'][0]}></source>
        Your blowser is not support
    </audio>
    )
}

export {
    AddsViewer
}