import React from 'react';
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
import { fetchMessages, onUpdateMessages, setReplyMessage } from '../../store';
import { AddsViewer } from './components/addsViewer/AddsViewer';
import { Message } from './components/Message/Message';

function ChatComponent() {
  const [AuthUser] = useContext(AuthContext);
  const { messages, messagesData, roomData } = useAppSelector(
    (store) => store.partySlice
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = styleComponent(theme);

  function onReplyMessagePress(messageId) {
    dispatch(setReplyMessage(messageId));
  }

  function onShowMenuButtonPress() {}

  function onAddAddsButtonPress() {}

  function onSendMessageButtonPress() {}
  let i = 0;
  function onScrollMessages(e) {
    const {scrollTop, scrollHeight} = e.target
    const { scrollDirection, messagesOnScreen, queryMessage} =
      messagesData.update(e.target);
    if ((scrollTop >= 600 && scrollDirection === 'down') || ((scrollHeight - Math.abs(scrollTop)) <= 750 && scrollDirection === 'up')) {
      i = 1;
      dispatch(
        fetchMessages({
          roomId: roomData.roomId,
          messageStart: queryMessage,
          offset: 20,
          where: scrollDirection,
        })
      );
    }
    // dispatch(onUpdateMessages({
    //   scrollDirection,
    //   messagesOnScreen
    // }))
  }
  function MesssageComponent({messageId, messageIds}) {
    return (
      <Box key={messageId}>
        <Message
          // prevMessageId={messageIds[idx - 1]}
          messageId={messageId}
          // nextMessageId={messageIds[idx + 1]}
        />
      </Box>
    );
  }
 
 const memoMessages = messages.map((messageId, messageIds) => {
  const MemoComponent = React.memo(MesssageComponent)
  return <MemoComponent messageId={messageId} messageIds={messageIds}  key={messageId} index={messageId} />
    // return (
    //   <Box key={messageId}>
    //     <Message
    //       prevMessageId={messageIds[idx - 1]}
    //       messageId={messageId}
    //       nextMessageId={messageIds[idx + 1]}
    //     />
    //   </Box>
    // );
  })

  return (
    <Box onScroll={onScrollMessages} sx={styles.layout}>
      {memoMessages}
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

export {
  ChatComponent
}
