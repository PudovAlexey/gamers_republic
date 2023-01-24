import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../hooks/typedReduxHooks';
import useDebounce from '../../../../../../../../hooks/useDebounce';
import { useContext } from 'react';
import { parseTimeByString } from '../../../../../../../../utils/timer/timer';
import { AddsViewer } from '../../../addsViewer/AddsViewer';
import { AuthContext } from '../../../../../../../AuthContext/AuthContext';
import { UserSend } from './MessageParts/MessageLayout/UserSend';
import { CompanionSend } from './MessageParts/MessageLayout/CompanionSend';
import { Paper, Stack, styled, Typography, useTheme } from '@mui/material';
import { ReplyControl } from './MessageParts/MessageLayout/ReplyControl';
import { onAddReplyId } from '../../../../store/chatSlice';
import {
  isSelectedMessagesSelector,
  messageByIdSelector,
  messagesOnScreenSelector,
} from '../../../../store/selectors/chatSelector';
import { mainStyles } from '../../../../../../../../styles';
import MessageDate from '../../../MessageDate/MessageDate';
import { MessageText } from './MessageParts/MessageLayout/MessageText';
export const selectionColor = `rgba(255, 70, 86, 0.2)`;

function MessageControl({ messageId }) {
  const isSelectedMessage = useAppSelector((state) =>
    isSelectedMessagesSelector(state, messageId)
  );
  const messagesOnScreen = useAppSelector(messagesOnScreenSelector)
  const [AuthUser] = useContext(AuthContext);
  const messageData = useAppSelector((state) =>
    messageByIdSelector(state, messageId)
  );
  const {
    notDebounced: [value, setValue],
    debounced: [debounceValue, setDebounceValue],
  } = useDebounce([],
    20
  );

  useEffect(() => {
    setDebounceValue(messagesOnScreen)
  }, [messagesOnScreen])

  if (!messageData) return null;
  const { userId } = messageData;
  if (!debounceValue.some(m => +m.dataset.messageid === messageId || +m.dataset.messageid === messageId + 1 || +m.dataset.messageid === messageId - 1)) {
    return <Box data-messageid={messageId} sx={{height: '350px'}}></Box>
  }
  return (
    <React.Fragment>
      <MessageDate messageId={messageId} />
      <Box
        sx={{
          position: 'relative',
          mb: '16px',
        }}
        key={messageId}
        data-messageid={messageId}
      >
        <SelectionLayout
          sx={isSelectedMessage ? { background: selectionColor } : null}
        ></SelectionLayout>
        {AuthUser?.id === userId ? (
          <UserSend messageId={messageId}>
            { <Message side={'left'} messageId={messageId} />}
          </UserSend>
        ) : (
          <CompanionSend messageId={messageId}>
            {<Message side={'right'} messageId={messageId} />}
          </CompanionSend>
        )}
      </Box>
    </React.Fragment>
  );
}

function Message({ messageId, side }) {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const styles = mainStyles(palette);
  const messageData = useAppSelector((state) =>
    messageByIdSelector(state, messageId)
  );
  if (!messageData) return null;
  const { message, adds, createdAt } = messageData;
  return (
    <MessagePaper
      onDoubleClick={(e) => {
        dispatch(onAddReplyId(messageId));
      }}
    >
      <Paper sx={{padding: '8px'}}>
        <Stack spacing={1}>
        <ReplyControl messageId={messageId} />
        <Box
          sx={{
            ...styles.select,
          }}
        >
          <MessageText messageId={messageId}>{message}</MessageText>
        </Box>
        {adds && <AddsViewer adds={adds} />}
        <Stack>
        <Typography sx={{justifyContent: side}}>
          {parseTimeByString({
            time: createdAt,
            formatter: ({ hours, minutes }) => `${hours}:${minutes}`,
          })}
        </Typography>
        </Stack>
        </Stack>
      </Paper>
    </MessagePaper>
  );
}

const MessagePaper = styled(Paper)({
  background: "#1F2326",
})

const SelectionLayout = styled(Box)({
  position: 'absolute',
  top: -5,
  left: 0,
  right: 0,
  bottom: -5,
});

export default React.memo(MessageControl);
