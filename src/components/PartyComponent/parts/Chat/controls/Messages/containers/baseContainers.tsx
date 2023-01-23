import { styled } from "@mui/material";
import { Box } from "@mui/system";

const ScrollContainer = styled(Box)({
    position: 'relative',
    overflowX: "hidden",
    overflowY: "auto",
    display: 'flex',
    flexDirection: 'column-reverse',
    maxHeight: "calc(100vh - 380px)",
    minHeight: 'calc(100vh - 380px)',
    "&::before": {
        content: "''",
        backgroundSize: "cover",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
        willChange: "transform",
        zIndex: -1
    }
})

const ChatContainer = styled(Box)({
    display: 'flex',
    padding: '8px',
    flexDirection: 'column-reverse'
})

export {
    ScrollContainer,
    ChatContainer
}