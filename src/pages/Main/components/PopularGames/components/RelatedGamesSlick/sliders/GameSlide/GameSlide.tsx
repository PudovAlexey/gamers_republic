import React from "react"
import { Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { GameSliderConfig } from "./config"
import { GrayTypography } from "../../../../../../../../components/reusable/layout"

function GameSlide() {
    return GameSliderConfig.map(({title, highlights, img}) => (
        <Stack sx={{
            display: 'flex !important'
        }} direction={'row'} spacing={2}>
             <img style={{
                display: 'block',
                width: 'auto',
                maxHeight: '200px'
            }} src={img}/>
             <Box>
             <Stack spacing={3}>
            <Typography variant="h4">{title}</Typography>
            <Stack spacing={2}>
            {
                highlights.map(({key, value}) => (
                    <Stack alignItems={'start'} direction={'row'} spacing={1}>
                        <GrayTypography>{key}:</GrayTypography>
                        <Typography>{value}</Typography>
                    </Stack>
                ))
            }
            </Stack>
        </Stack>
             </Box>
        </Stack>
       
    ))
}

export {
    GameSlide
}