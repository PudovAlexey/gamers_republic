import { IconButton, Stack, Typography, useTheme } from "@mui/material"
import { Box, styled } from "@mui/system"
// import { mainStyles } from 'src/styles';
import { MessageContent } from "./MessageContent"
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from "../../../../../../../../../AuthContext/AuthContext";
import AvatarComponent from "../../../../../../../../../reusable/AvatarComponent/AvatarComponent";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";
import { selectItemById } from "../../../../../../store/messageInfoSlice";
import { SendProgress } from "../../../../containers/SendProgress";
import { loadMessageById } from "../../../../../../store/selectors/chatSelector";
import { onShowReply } from "../../../../../../store/chatSlice";
import {mainStyles} from "../../../../../../../../../../styles"

function UserSend({children, messageId}) {
  const { palette } = useTheme();
  const styles = mainStyles(palette);
  const dispatch = useAppDispatch()
  const loadMessage = useAppSelector((action) => loadMessageById(action, messageId))
    const [AuthUser] = useContext(AuthContext);
    const messageData = useAppSelector((state) =>
    selectItemById(state.messagesInfoSlice, messageId)
  );
  if (!messageData) return null
  
    return  <RightPartComponent>
        <MessageContent>
        <Stack spacing={1}>
        <RightToolBar>
        <RightProgress>
          {loadMessage && <SendProgress/>}
        </RightProgress>
            <IconButton onClick={() => {}} aria-label="menu">
              <MoreVertIcon />
            </IconButton>
            <Stack direction={"row"} spacing={1}>
            <Typography sx={{
              ...styles.select
            }}>{AuthUser.username}</Typography>
            <AvatarComponent {...AuthUser} />
            </Stack>
            <IconButton onClick={() => dispatch(onShowReply(messageData))}>
              <ReplyIcon />
            </IconButton>
          </RightToolBar>
            {children}
        </Stack>
            </MessageContent>
    </RightPartComponent>
}
const RightPartComponent = styled(Box)({
    position: 'relative',
    display: 'flex',
    justifyContent: 'end',
})

const RightToolBar = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse'
})

const RightProgress = styled(Box)({
  zIndex: 1,
  position: 'absolute',
  bottom: '5px',
  right: '40%'
 })

export {
    UserSend
}