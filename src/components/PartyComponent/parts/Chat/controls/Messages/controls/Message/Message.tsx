import React from 'react';
import { Box } from '@mui/system';
import { mainStyles } from 'src/styles';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../hooks/typedReduxHooks';
import { MarkdownEditor } from '../../../../../../../reusable/MkEditor/MkEditorComponent';
import { useContext } from 'react';
import { parseTimeByString } from '../../../../../../../../utils/timer/timer';
import { AddsViewer } from '../../../addsViewer/AddsViewer';
import { AuthContext } from '../../../../../../../AuthContext/AuthContext';
import { selectItemById } from '../../../../store/messageInfoSlice';
import { UserSend } from './MessageParts/MessageLayout/UserSend';
import { CompanionSend } from './MessageParts/MessageLayout/CompanionSend';
import { Paper, Typography, useTheme } from '@mui/material';
import { ReplyControl } from './MessageParts/MessageLayout/ReplyControl';
import { onAddReplyId } from '../../../../store/chatSlice';
import { isSelectedMessagesSelector } from '../../../../store/selectors/chatSelector';

function MessageControl({ messageId }) {
  const [AuthUser] = useContext(AuthContext);
  const messageData = useAppSelector((state) =>
    selectItemById(state.chatRedusers.messages, messageId)
  );
  if (!messageData) return null;
  const { userId } = messageData;
  return (
    <Box
      sx={{
        mb: '16px',
      }}
      key={messageId}
      data-messageid={messageId}
    >
      {AuthUser?.id === userId ? (
        <UserSend messageId={messageId}>
          {<Message messageId={messageId} />}
        </UserSend>
      ) : (
        <CompanionSend messageId={messageId}>
          {<Message messageId={messageId} />}
        </CompanionSend>
      )}
    </Box>
  );
}

function Message({ messageId }) {
  const {palette} = useTheme()
  const dispatch = useAppDispatch();
  const styles = mainStyles(palette);
  const messageData = useAppSelector((state) =>
    selectItemById(state.chatRedusers.messages, messageId)
  );
  const isSelectedMessage = useAppSelector((state) =>
    isSelectedMessagesSelector(state, messageId)
  );
  if (!messageData) return null;
  const { message, adds, createdAt } = messageData;
  return (
    <Box
    onDoubleClick={(e) => {
        console.log(isSelectedMessage)
        dispatch(onAddReplyId(messageId));
      }}
    >
      <Paper sx={isSelectedMessage && { background: palette.grey[300] }}>
        <ReplyControl messageId={messageId} />
        <Box  sx={{
          ...styles.select
        }}>
        <MarkdownEditor
        sx={isSelectedMessage && { background: palette.grey[300] }}
          value={message || ''}
          view={{
            menu: false,
            md: false,
            html: true,
          }}
        />
        </Box>
        {adds && <AddsViewer adds={adds} />}
        <Typography>
          {parseTimeByString({
            time: createdAt,
            formatter: ({ hours, minutes }) => `${hours}:${minutes}`,
          })}
        </Typography>
      </Paper>
    </Box>
  );
}

export default React.memo(MessageControl);
