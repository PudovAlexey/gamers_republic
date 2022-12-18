import React from 'react';
import { Box } from '@mui/system';
import { useAppSelector } from '../../../../../../../../hooks/typedReduxHooks';
import { MarkdownEditor } from '../../../../../../../reusable/MkEditor/MkEditorComponent';
import { useContext } from 'react';
import { parseTimeByString } from '../../../../../../../../utils/timer/timer';
import { AddsViewer } from '../../../addsViewer/AddsViewer';
import { AuthContext } from '../../../../../../../AuthContext/AuthContext';
import { selectItemById } from '../../../../store/messageInfoSlice';
import { UserSend } from './MessageParts/MessageLayout/UserSend';
import { CompanionSend } from './MessageParts/MessageLayout/CompanionSend';
import { Paper, Typography } from '@mui/material';

function Message({ messageId }) {
  const [AuthUser] = useContext(AuthContext);
  const messageData = useAppSelector((state) =>
    selectItemById(state.messagesInfoSlice, messageId)
  );
  if (!messageData) return null;
  const {userId, message, adds, createdAt} = messageData
  const Message = (
    <Box>
          {/* <Box>
            <AvatarComponent {...AuthUser} />
            <IconButton onClick={onReplyMessagePress}>
              <ReplyIcon />
            </IconButton>
            <IconButton onClick={onShowMenuButtonPress} aria-label="menu">
              <MoreVertIcon />
            </IconButton>
          </Box> */}
          <Paper>
            <MarkdownEditor
              value={message || ''}
              view={{
                menu: false,
                md: false,
                html: true,
              }}
            />
            {adds && <AddsViewer adds={adds} />}
            <Typography>
              {parseTimeByString({
                time: createdAt,
                formatter: ({ hours, minutes }) => `${hours}:${minutes}`,
              })}
            </Typography>
          </Paper>
        </Box>
  )
  return (
    <Box sx={{
      mb: "16px"
    }} key={messageId} data-messageid={messageId}>
      {
        AuthUser?.id === userId ? 
        <UserSend messageId={messageId}>{Message}</UserSend> : 
        <CompanionSend messageId={messageId}>{Message}</CompanionSend>
      }
    </Box>
  );
}

export default React.memo(Message);
