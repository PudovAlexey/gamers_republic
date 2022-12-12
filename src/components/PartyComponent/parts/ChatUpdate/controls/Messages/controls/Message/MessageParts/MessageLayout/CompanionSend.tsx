import { Box, styled } from "@mui/system"
import { MessageContent } from "./MessageContent"
function CompanionSend({children}) {
    return <LeftPartComponent>
        
        <MessageContent>{children}</MessageContent>
    </LeftPartComponent>
}

const LeftPartComponent = styled(Box)({
    display: 'flex',
    justifyContent: 'start',
})

export {
    CompanionSend
}