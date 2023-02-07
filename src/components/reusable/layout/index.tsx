import { Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

const DarkButton = styled(Button)({
    color: "#1F2326"
})

const IconButtonRounded = styled(IconButton)({
    borderRadius: '50% !important',
})

function Dark({children}) {
    const Component = styled(children)({

    })
    return <Component/>
}

const GrayTypography = styled(Typography)({
    color: '#7e7e7e'
})

const BoldTypography = styled(Typography)({
    fontWeight: 'bold'
})

export {
    DarkButton,
    IconButtonRounded,
    Dark,
    GrayTypography,
    BoldTypography
}