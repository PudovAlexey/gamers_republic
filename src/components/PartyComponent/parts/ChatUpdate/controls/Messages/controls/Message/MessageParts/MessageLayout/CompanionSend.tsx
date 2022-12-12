import { IconButton, Stack, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks"
import AvatarComponent from "../../../../../../../../../reusable/AvatarComponent/AvatarComponent"
import { selectUserByMessageId } from "../../../../../../store/messageInfoSlice"
import { MessageContent } from "./MessageContent"
import ReplyIcon from '@mui/icons-material/Reply';
function CompanionSend({children, messageId}) {
    const user = useAppSelector((action) => selectUserByMessageId(action.messagesInfoSlice, messageId))

    if (!user) return null
    return <LeftPartComponent>
        <MessageContent>
        <LeftToolBar>
            <IconButton onClick={() => {}} aria-label="menu">
              <MoreVertIcon />
            </IconButton>
            <Stack direction={"row"} spacing={1}>
            <Typography>{user.username}</Typography>
            <AvatarComponent {...user} />
            </Stack>
            <IconButton onClick={() => {}}>
              <ReplyIcon />
            </IconButton>
          </LeftToolBar>
        {children}
        </MessageContent>
    </LeftPartComponent>
}

const LeftPartComponent = styled(Box)({
    display: 'flex',
    justifyContent: 'start',
})

const LeftToolBar = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
})

export {
    CompanionSend
}