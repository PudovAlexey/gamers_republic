import { Box, Stack, styled } from "@mui/system"
import { BlockSlider } from "./components/BlockSlider"
import { BlockText } from "./components/BlockText"

function Features() {
    return (
        <Block>
            <Stack direction={'row'} spacing={3}>
            <BlockSlider/>
            <BlockText/>
            </Stack>
        </Block>
    )
}

const Block = styled(Box)({
    background: '#0F1923',
    width: '99vw',
    height: '100vh'
})

export {
    Features
}