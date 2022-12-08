import { IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';
import { useAppSelector } from "../../../../../../../../hooks/typedReduxHooks";
import AvatarComponent from "../../../../../../../reusable/AvatarComponent/AvatarComponent";
import { MarkdownEditor } from "../../../../../../../reusable/MkEditor/MkEditorComponent";
import { useContext } from "react";
import { parseTimeByString } from "../../../../../../../../utils/timer/timer";
import { AddsViewer } from "../../../../../Chat/components/addsViewer/AddsViewer";
import { AuthContext } from "../../../../../../../AuthContext/AuthContext";

function Message({messageId}) {
    const [AuthUser] = useContext(AuthContext)
    const messageData = useAppSelector((aciton) => aciton.messagesInfoSlice[messageId])
    if (!messageData) return null
    function onReplyMessagePress() {}
    function onShowMenuButtonPress() {}

    return (
        <Box key={messageId} data-messageId={messageId}>
        {/* <DateViewer
          prevMessageDate={prevMessage?.createdAt}
          messageDate={message.createdAt}
          nextMessageDate={nextMessage?.createdAt}
        /> */}
        <Box
        >
          <Box>
            <Box>
              <AvatarComponent {...AuthUser} />
              <IconButton onClick={() => onReplyMessagePress(messageId)}>
                <ReplyIcon />
              </IconButton>
              <IconButton
                onClick={onShowMenuButtonPress}
                aria-label="menu"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Paper>
              <MarkdownEditor
              value={messageData.message || ""}
              view={{
                  menu: false,
                  md: false,
                  html: true
              }}
              />
          {messageData.adds && (
            <AddsViewer adds={messageData.adds}/>
          )}
          <Typography>
            {parseTimeByString({
              time: messageData.createdAt,
              formatter: ({ hours, minutes }) =>
                `${hours}:${minutes}`,
            })}
          </Typography>
        </Paper>
          </Box>
        </Box>
      </Box>
      )
} 

export {
    Message
}