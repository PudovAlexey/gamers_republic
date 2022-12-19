import { CircularProgress, IconButton, Stack, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks"
import AvatarComponent from "../../../../../../../../../reusable/AvatarComponent/AvatarComponent"
import { selectUserByMessageId } from "../../../../../../store/messageInfoSlice"
import { MessageContent } from "./MessageContent"
import ReplyIcon from '@mui/icons-material/Reply';
import { SendProgress } from "../../../../containers/SendProgress";
import { loadMessageById } from "../../../../../../store/selectors/chatSelector";
function CompanionSend({children, messageId}) {
    const loadMessage = useAppSelector((action) => loadMessageById(action, messageId))
    const user = useAppSelector((action) => selectUserByMessageId(action.messagesInfoSlice, messageId))

    if (!user) return null
    return <LeftPartComponent>
        <MessageContent>
        <LeftToolBar>
        <LeftProgress>
           {loadMessage && <SendProgress/>}
        </LeftProgress>
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
  position: 'relative',
})

const LeftToolBar = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
})

const LeftProgress = styled(Box)({
zIndex: 1,
 position: 'absolute',
 bottom: '5px',
 left: '40%'
})

export {
    CompanionSend
}