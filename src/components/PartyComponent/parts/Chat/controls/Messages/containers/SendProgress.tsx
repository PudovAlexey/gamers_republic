import { CircularProgress } from "@mui/material"

function SendProgress() {
    return <CircularProgress size='20px'
    sx={{
      "--CircularProgress-size": "10px",
      "--CircularProgress-track-thickness": "1px",
      "--CircularProgress-progress-thickness": "1px"
    }}
  />
}

export {
    SendProgress
}