import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ReplyMessage } from './components/ReplyMessage';

function ChatInput() {
  function onAddAddsButtonPress() {}
  function onSendMessageButtonPress() {}
  return (
    <FormControl>
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
    </FormControl>
  );
}

export { ChatInput };
