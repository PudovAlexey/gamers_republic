import React from 'react';
import { Box } from '@mui/system';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../hooks/typedReduxHooks';

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
} from '../../../../store/selectors/chatSelector';
import { mainStyles } from '../../../../../../../../styles';
import MessageDate from '../../../MessageDate/MessageDate';
import { MessageText } from './MessageParts/MessageLayout/MessageText';
import { TError } from '../../../../../../../../types/index';
export const selectionColor = `rgba(255, 70, 86, 0.2)`;

function MessageControl({ messageId }) {
  const [AuthUser] = useContext(AuthContext);
  const messageData = useAppSelector((state) =>
    messageByIdSelector(state, messageId)
  );
  const { userId } = messageData;
  const isSelectedMessage = useAppSelector((state) =>
    isSelectedMessagesSelector(state, messageId)
  );

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
            {<Message side={'left'} messageId={messageId} />}
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

  const date = parseTimeByString({
    time: createdAt,
    formatter: ({ hours, minutes }) => `${hours}:${minutes}`,
  });
  const parseDate: string =
    (date as TError)?.type === 'error'
      ? (date as TError).message
      : (date as string);
  return (
    <MessagePaper
      onDoubleClick={(e) => {
        dispatch(onAddReplyId(messageId));
      }}
    >
      <Paper sx={{ padding: '8px' }}>
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
            <Typography sx={{ justifyContent: side }}>{parseDate}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </MessagePaper>
  );
}

const MessagePaper = styled(Paper)({
  background: '#1F2326',
});

const SelectionLayout = styled(Box)({
  position: 'absolute',
  top: -5,
  left: 0,
  right: 0,
  bottom: -5,
});

export default React.memo(MessageControl);
