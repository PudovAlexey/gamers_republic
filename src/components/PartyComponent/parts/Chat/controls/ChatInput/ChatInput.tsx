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
  Zoom,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SouthIcon from '@mui/icons-material/South';
import { ReplyMessage } from './components/ReplyMessage/ReplyMessage';
import {
  INPUT_PRESS_BY_ACTION,
  INPUT_UNPRESS,
  SENDMESSAGE,
  UPLOAD_FILES,
} from '../../store/actionCreators';
import { inputMessage, onMoveChatToBottom, setChatInputRef } from '../../store/chatSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import {
  addsSelector,
  inputRowsSelector,
  maxMessagesIdsSelector,
  messageInputSelector,
  replyHeightSelector,
  showNavItemsSelector,
  showReplySelector,
} from '../../store/selectors/chatSelector';
import { FileUploader } from '../../../../../reusable/FileUploader/FileUploader';
import { CaptureModal } from './components/CaptureModal/CaptureModal';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { userSelector } from '../../../../../../store/authSlice/selectors';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { toggleEmojiAnchor } from '../../store/chatSlice';
import React, { useEffect, useRef } from 'react';
import { EmojiPopover } from '../EmojiPopover/EmojiPopover';

function ChatInput() {
  const inputRef = useRef()
  const inputRows = useAppSelector(inputRowsSelector);
  const replyHeight = useAppSelector(replyHeightSelector);
  const input = useAppSelector(messageInputSelector);
  const adds = useAppSelector(addsSelector);
  const userData = useAppSelector(userSelector);
  const maxMessageId = useAppSelector(maxMessagesIdsSelector);
  const showReply = useAppSelector(showReplySelector);
  const showNavItems = useAppSelector(showNavItemsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChatInputRef(inputRef.current))
  })
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <ReplyWrapContainer>
          <ReplyMessage />
        </ReplyWrapContainer>
        <TextField
          inputRef={inputRef}
          size="small"
          rows={inputRows}
          multiline
          onKeyDown={(e) => dispatch(INPUT_PRESS_BY_ACTION(e))}
          onKeyUp={(e) => dispatch(INPUT_UNPRESS(e))}
          value={input}
          onChange={(e) => dispatch(inputMessage(e))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <InputPaper>
                  <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                    <IconButton onClick={(e) => dispatch(toggleEmojiAnchor(e.currentTarget))}>
                      <EmojiEmotionsIcon/>
                    </IconButton>
                  <IconButton>
                    <KeyboardVoiceIcon />
                  </IconButton>
                  <FileUploader
                    onChange={(e) =>
                      dispatch(
                        UPLOAD_FILES({
                          event: e,
                          operation: 'create',
                        })
                      )
                    }
                  >
                    <CameraAltIcon />
                  </FileUploader>
                  <IconButton
                    onClick={() => {
                      input && dispatch(
                        SENDMESSAGE({
                          message: input,
                          adds: adds,
                          userData: userData,
                          lastMessageId: maxMessageId,
                        })
                      );
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                  <Zoom in={showNavItems}>
                    <BottomNavIcon
                      sx={{
                        top: `${-(60 + (showReply ? replyHeight : 0))}px`,
                      }}
                      size="small"
                      onClick={() => dispatch(onMoveChatToBottom())}
                    >
                      <SouthIcon fontSize="small" />
                    </BottomNavIcon>
                  </Zoom>
                  </Stack>
                </InputPaper>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <CaptureModal />
      <EmojiPopover/>
    </React.Fragment>
  );
}

const ReplyWrapContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  padding: '0 5px',
  top: '4px',
});

const BottomNavIcon = styled(IconButton)({
  position: 'absolute',
  // top: '-60px',
  right: '30px',
  background: 'red',
});

const InputPaper = styled(Paper)({
  background: '#1F2326',
  position: 'relative',
  right: '-22px'
})

export { ChatInput };
