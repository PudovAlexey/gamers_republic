import { styled } from "@mui/material";
import { Box } from "@mui/system";

const ScrollContainer = styled(Box)({
    overflowX: "hidden",
    overflowY: "auto",
    display: 'flex',
    flexDirection: 'column-reverse',
    maxHeight: "500px"
})

const ChatContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column-reverse'
})

export {
    ScrollContainer,
    ChatContainer
}