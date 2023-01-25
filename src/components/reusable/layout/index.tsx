import { Button, IconButton } from "@mui/material";
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

export {
    DarkButton,
    IconButtonRounded,
    Dark
}