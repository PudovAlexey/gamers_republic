import { styled } from "@mui/material"
import { Box } from "@mui/system"

const mockData = [
    {
        title: "1",
        subtitle: '1',
        description: '1'
    },
    {
        title: "1",
        subtitle: '1',
        description: '1'
    },
    {
        title: "1",
        subtitle: '1',
        description: '1'
    },
    {
        title: "1",
        subtitle: '1',
        description: '1'
    },
    {
        title: "1",
        subtitle: '1',
        description: '1'
    },
]

function WhatsNew() {
    return (
        <WhatsNewBlock>
          Whats new
        </WhatsNewBlock>
    )
}

const WhatsNewBlock = styled(Box)({
    background: '#f8f8f8',
    height: '100vh',
    width: '100vw'
})

export {
    WhatsNew
}