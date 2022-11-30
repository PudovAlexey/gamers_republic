import { useTheme } from '@emotion/react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { AuthContext } from '../../../AuthContext/AuthContext';
import AvatarComponent from '../../../reusable/AvatarComponent/AvatarComponent';
import { dinamicStyles, styleComponent } from './styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import { DateViewer } from './components/DateViewer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { parseTimeByString } from '../../../../utils/timer/timer';
import ReplyIcon from '@mui/icons-material/Reply';
import { ReplyMessage } from './components/ReplyMessage';
import { setReplyMessage } from '../../store';
import { AddsViewer } from './components/addsViewer/AddsViewer';
import { Message } from './components/Message/Message';

function ChatComponent() {
  const [AuthUser] = useContext(AuthContext);
  const { messages } = useAppSelector((store) => store.partySlice);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = styleComponent(theme);

  function onReplyMessagePress(messageId) {
    dispatch(setReplyMessage(messageId));
  }

  function onShowMenuButtonPress() {}

  function onAddAddsButtonPress() {}

  function onSendMessageButtonPress() {}

  function onScrollMessages(e) {
    const topParrentContainer = e.target.getBoundingClientRect().top;
    const lastMessageOnScreen = Array.from(e.target.children).find(
      (child) =>
        child.getBoundingClientRect().top <=
        e.target.getBoundingClientRect().top
    );
    console.log(messages, e);
  }

  return (
    <Box onScroll={onScrollMessages} sx={styles.layout}>
      {messages.map(
        ({ message, userId, createdAt, messageId, adds }, idx, messages) => {
          return (
            <Box data-messageId={messageId}>
              <DateViewer
                prevMessageDate={messages[idx - 1]?.createdAt}
                messageDate={createdAt}
                nextMessageDate={messages[idx + 1]?.createdAt}
              />
              <Box
                sx={{
                  ...styles.message,
                  ...dinamicStyles.chatByUser(userId, AuthUser),
                }}
              >
                <Box sx={styles.messageItem}>
                  <Box
                    sx={{
                      ...styles.messageInfo,
                      ...dinamicStyles.avatarByUser(userId, AuthUser),
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
                  <Message
                    message={message}
                    adds={adds}
                    createdAt={createdAt}
                  />
                </Box>
              </Box>
            </Box>
          );
        }
      )}
      <FormControl sx={styles.input}>
        <ReplyMessage />
        <TextField
          sx={styles.chatInput}
          InputProps={{
            style: styles.chatInput,
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={styles.chatTools}>
                  <CameraAltIcon onClick={onAddAddsButtonPress} />
                  <SendIcon onClick={onSendMessageButtonPress} />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
}

export { ChatComponent };
