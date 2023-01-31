import { styled, Typography } from "@mui/material";

const StrokeText = styled(Typography)({
    color: "transparent",
    "-webkit-text-stroke-width": "3px",
    "-webkit-text-stroke-color": "#fff"
})

const LightTypography = styled(Typography)({
    color: '#f8f8f8'
})

const TextBoldLight = styled(Typography)({
    fontWeight: 'bold',
    color: '#f8f8f8'
})

export {
    StrokeText,
    LightTypography,
    TextBoldLight
}