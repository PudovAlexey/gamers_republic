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
import { INPUT_PRESS_BY_ACTION, INPUT_UNPRESS, SENDMESSAGE, UPLOAD_FILES } from '../../store/actionCreators';
import { inputMessage, onMoveChatToBottom } from '../../store/chatSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import {
  addsSelector,
  inputRowsSelector,
  maxMessagesIdsSelector,
  messageInputSelector,
} from '../../store/selectors/chatSelector';
import { FileUploader } from '../../../../../reusable/FileUploader/FileUploader';
import { CaptureModal } from './components/CaptureModal/CaptureModal';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { userSelector } from '../../../../../../store/authSlice/selectors';

function ChatInput() {
  const inputRows = useAppSelector(inputRowsSelector)
  const input = useAppSelector(messageInputSelector);
  const adds = useAppSelector(addsSelector);
  const userData = useAppSelector(userSelector);
  const maxMessageId = useAppSelector(maxMessagesIdsSelector);
  const dispatch = useAppDispatch();
  return (
    <InputPaper>
      <FormControl fullWidth>
        <ReplyWrapContainer>
          <ReplyMessage />
        </ReplyWrapContainer>
        <TextField
          size='small'
          rows={inputRows}
          multiline
          onKeyDown={(e) => dispatch(INPUT_PRESS_BY_ACTION(e))}
          onKeyUp={(e) => dispatch(INPUT_UNPRESS(e))}
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
                      dispatch(SENDMESSAGE({
                        message: input,
                        adds: adds,
                        userData: userData,
                        lastMessageId: maxMessageId,
                      }));
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
