import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material"
import { styleComponent, dinamicStyles } from "../../styles"
import { parseTimeByString } from "../../../../../../utils/timer/timer"
import { AddsViewer } from "../addsViewer/AddsViewer"
import { MarkdownEditor } from "../../../../../reusable/MkEditor/MkEditorComponent"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks"
import { useContext, useMemo } from "react"
import { DateViewer } from "../DateViewer"
import AvatarComponent from "../../../../../reusable/AvatarComponent/AvatarComponent"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';
import { AuthContext } from "../../../../../AuthContext/AuthContext"

function Message({prevMessageId, messageId, nextMessageId}) {
  const [AuthUser] = useContext(AuthContext);
    const theme = useTheme()
    const styles = styleComponent(theme)
    const dispatch = useAppDispatch()
    const messages = useAppSelector((action) => action.partySlice.messageById)
    const {
      // prevMessage,
      message,
      // nextMessage
    } = useMemo(() => ({
      // prevMessage: messages[prevMessageId],
      message: messages[messageId],
      // nextMessage: messages[nextMessageId]
    }), [messageId])
    if (!message) return null
    function onReplyMessagePress(messageId) {
      // dispatch(setReply(messageId));
    }

    function onShowMenuButtonPress() {}
    return (
      <Box key={messageId} data-messageId={messageId}>
      {/* <DateViewer
        prevMessageDate={prevMessage?.createdAt}
        messageDate={message.createdAt}
        nextMessageDate={nextMessage?.createdAt}
      /> */}
      <Box
        sx={{
          ...styles.message,
          ...dinamicStyles.chatByUser(message.userId, AuthUser),
        }}
      >
        <Box sx={styles.messageItem}>
          <Box
            sx={{
              ...styles.messageInfo,
              ...dinamicStyles.avatarByUser(message.userId, AuthUser),
            }}
          >
            <AvatarComponent sx={styles.messageAvatar} {...AuthUser} />
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
          <Paper sx={styles.messageText}>
            <MarkdownEditor
            value={message.message || ""}
            view={{
                menu: false,
                md: false,
                html: true
            }}
            />
        {message.adds && (
          <AddsViewer adds={message.adds}/>
        )}
        <Typography sx={styles.dateText}>
          {parseTimeByString({
            time: message.createdAt,
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