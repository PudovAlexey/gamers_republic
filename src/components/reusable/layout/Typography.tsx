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

const TitleText = styled(Typography)({
    WebkitTextFillColor: 'transparent',
    textTransform: "uppercase",
    fontWeight: 'bold',
    fontSize: '6vw',
    color: 'transparent',
    display: "table",
    WebkitBackgroundClip: "text !important",
    backgroundClip: "text !important",
    background: '#d93644'
})

export {
    StrokeText,
    LightTypography,
    TextBoldLight,
    TitleText
}