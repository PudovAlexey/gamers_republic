import { styled, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { LightTypography, TextBoldLight } from "../../../../../components/reusable/layout/Typography"
import { blockTextConfig } from "./config"

function BlockText() {
    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
            <LightTypography>//:{blockTextConfig.title.toUpperCase()}/</LightTypography>
            <DescriptionText>{blockTextConfig.description}</DescriptionText>
        </Stack>
        <Stack direction={'row'} spacing={2}>
        {
            blockTextConfig.featureBlock.map(({title, description}) => (
                <Stack spacing={1}>
                    <TextBoldLight>{title}</TextBoldLight>
                    <DescriptionText>{description}</DescriptionText>
                </Stack>
            ))
        }
        </Stack>
        </Stack>
    )
}

const DescriptionText = styled(LightTypography)({
    maxWidth: '365px',
    fontStyle: 'italic'
})

export {
    BlockText
}