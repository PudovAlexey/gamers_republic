import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputAdornment, styled, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ReplyMessage } from './components/ReplyMessage';

function ChatInput() {
  function onAddAddsButtonPress() {}
  function onSendMessageButtonPress() {}
  return (
    <ChatFormContainer>
      <ReplyMessage />
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box>
                <CameraAltIcon onClick={onAddAddsButtonPress} />
                <SendIcon onClick={onSendMessageButtonPress} />
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </ChatFormContainer>
  );
}

const ChatFormContainer = styled(FormControl)({
  position: 'absolute',
  left: '-1%',
  width: '102%',
  bottom: '-5px'
})

export { ChatInput };
