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
import { useAppSelector } from '../../../../hooks/typedReduxHooks';
import { AuthContext } from '../../../AuthContext/AuthContext';
import AvatarComponent from '../../../reusable/AvatarComponent/AvatarComponent';
import { dinamicStyles, styleComponent } from './styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import { DateViewer } from './components/DateViewer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { parseTime, parseTimeByString } from '../../../../utils/timer/timer';
import ReplyIcon from '@mui/icons-material/Reply';
import { ReplyMessage } from './components/ReplyMessage';

function ChatComponent() {
  const [AuthUser] = useContext(AuthContext);
  const { messages } = useAppSelector((store) => store.partySlice);
  const theme = useTheme();
  const styles = styleComponent(theme);

  function onReplyMessagePress() {

  }

  function onShowMenuButtonPress() {

  }

  return (
    <Box sx={styles.layout}>
      <Box sx={styles.messageBox}>
        {messages.map(({ message, userId, createdAt }, idx, messages) => {
          return (
            <Box>
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
                    <AvatarComponent
                      sx={styles.messageAvatar}
                      {...AuthUser}
                    />
                    <IconButton onClick={onReplyMessagePress}>
                        <ReplyIcon/>
                    </IconButton>
                    <IconButton onClick={onShowMenuButtonPress} aria-label='menu'>
                        <MoreVertIcon/>
                    </IconButton>
                  </Box>
                  <Paper sx={styles.messageText}>
                    {message}
                    <Typography sx={styles.dateText}>
                      {parseTimeByString({
                        time: createdAt,
                        formatter: ({ hours, minutes }) =>
                          `${hours}:${minutes}`,
                      })}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <FormControl sx={styles.input}>
        <ReplyMessage/>
        <TextField
        sx={styles.chatInput}
          InputProps={{
            style: styles.chatInput,
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={styles.chatTools}>
                  <CameraAltIcon />
                  <SendIcon />
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
