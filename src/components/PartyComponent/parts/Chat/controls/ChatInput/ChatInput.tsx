import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputAdornment, styled, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ReplyMessage } from './components/ReplyMessage';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { SENDMESSAGE } from '../../store/actionCreators';
import { inputMessage } from '../../store/chatSlice';

function ChatInput() {
  const input = useAppSelector(actions => actions.chatSlice.messageInput)
  const dispatch = useAppDispatch()
  function onAddAddsButtonPress() {}
  function onSendMessageButtonPress() {}
  return (
    <ChatFormContainer>
      <ReplyMessage />
      <TextField
      value={input}
        onChange={(e) => dispatch(inputMessage(e))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box>
                <CameraAltIcon onClick={onAddAddsButtonPress} />
                <SendIcon onClick={() => {
                  dispatch({
                    type: SENDMESSAGE
                  })
                }} />
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
