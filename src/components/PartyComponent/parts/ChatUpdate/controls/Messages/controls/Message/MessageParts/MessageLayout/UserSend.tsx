import { IconButton, Stack, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import { MessageContent } from "./MessageContent"
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from "../../../../../../../../../AuthContext/AuthContext";
import AvatarComponent from "../../../../../../../../../reusable/AvatarComponent/AvatarComponent";
import { useContext } from "react";
import { useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";
import { selectItemById } from "../../../../../../store/messageInfoSlice";

function UserSend({children, messageId}) {
    const [AuthUser] = useContext(AuthContext);
    const messageData = useAppSelector((state) =>
    selectItemById(state.messagesInfoSlice, messageId)
  );
  if (!messageData) return null
  
    return  <RightPartComponent>
        <MessageContent>
        <Stack spacing={1}>
        <RightToolBar>
            <IconButton onClick={() => {}} aria-label="menu">
              <MoreVertIcon />
            </IconButton>
            <Stack direction={"row"} spacing={1}>
            <Typography>{AuthUser.username}</Typography>
            <AvatarComponent {...AuthUser} />
            </Stack>
            <IconButton onClick={() => {}}>
              <ReplyIcon />
            </IconButton>
          </RightToolBar>
            {children}
        </Stack>
            </MessageContent>
    </RightPartComponent>
}
const RightPartComponent = styled(Box)({
    display: 'flex',
    justifyContent: 'end',
})

const RightToolBar = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse'
})

export {
    UserSend
}