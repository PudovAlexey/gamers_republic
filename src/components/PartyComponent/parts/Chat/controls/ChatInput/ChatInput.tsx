import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import {
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SouthIcon from '@mui/icons-material/South';
import { ReplyMessage } from './components/ReplyMessage/ReplyMessage';
import { SENDMESSAGE, UPLOAD_FILES } from '../../store/actionCreators';
import { inputMessage, onMoveChatToBottom } from '../../store/chatSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import {
  addsSelector,
  maxMessagesIdsSelector,
  messageInputSelector,
} from '../../store/selectors/chatSelector';
import { FileUploader } from '../../../../../reusable/FileUploader/FileUploader';
import { CaptureModal } from './components/CaptureModal/CaptureModal';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

function ChatInput() {
  const input = useAppSelector(messageInputSelector);
  const adds = useAppSelector(addsSelector);
  const userData = useAppSelector((actions) => actions.authSlice.user);
  const maxMessageId = useAppSelector(maxMessagesIdsSelector);
  const dispatch = useAppDispatch();
  const sendMessageAction = SENDMESSAGE({
    message: input,
    adds: adds,
    userData: userData,
    lastMessageId: maxMessageId,
  })
  return (
    <InputPaper>
      <FormControl fullWidth>
        <ReplyWrapContainer>
          <ReplyMessage />
        </ReplyWrapContainer>
        <TextField
          value={input}
          onChange={(e) => dispatch(inputMessage(e))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                  <IconButton>
                    <KeyboardVoiceIcon />
                  </IconButton>
                  <FileUploader
                    onChange={(e) =>
                      dispatch(UPLOAD_FILES({
                        event: e,
                        operation: 'create',
                      }))
                    }
                  >
                    <CameraAltIcon />
                  </FileUploader>
                  <IconButton
                    onClick={() => {
                      dispatch(sendMessageAction);
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                  <BottomNavIcon onClick={() => dispatch(onMoveChatToBottom())}>
                    <SouthIcon />
                  </BottomNavIcon>
                </Stack>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <CaptureModal />
    </InputPaper>
  );
}

const InputPaper = styled(Paper)({
  background: '#1F2326',
});

const ReplyWrapContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  padding: '0 5px',
  top: '4px',
});

const BottomNavIcon = styled(IconButton)({
  position: 'absolute',
  top: '-60px',
  right: '30px',
  background: 'red',
});

export { ChatInput };
