import React from 'react';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/typedReduxHooks';
import { MarkdownEditor } from '../../../../../../../reusable/MkEditor/MkEditorComponent';
import { useContext } from 'react';
import { parseTimeByString } from '../../../../../../../../utils/timer/timer';
import { AddsViewer } from '../../../addsViewer/AddsViewer';
import { AuthContext } from '../../../../../../../AuthContext/AuthContext';
import { selectItemById } from '../../../../store/messageInfoSlice';
import { UserSend } from './MessageParts/MessageLayout/UserSend';
import { CompanionSend } from './MessageParts/MessageLayout/CompanionSend';
import { Paper, Typography } from '@mui/material';
import { ReplyControl } from './MessageParts/MessageLayout/ReplyControl';
import { useEffect } from 'react';
import { onAddReplyId } from '../../../../store/chatSlice';
import { isSelectedMessagesSelector } from '../../../../store/selectors/chatSelector';

function MessageControl({ messageId }) {
  const [AuthUser] = useContext(AuthContext);
  const messageData = useAppSelector((state) =>
  selectItemById(state.chatRedusers.messages, messageId)
);
if (!messageData) return null;
const {userId} = messageData
  return (
    <Box sx={{
      mb: "16px"
    }} key={messageId} data-messageid={messageId}>
      {
        AuthUser?.id === userId ? 
        <UserSend messageId={messageId}>{<Message messageId={messageId}/>}</UserSend> : 
        <CompanionSend messageId={messageId}>{<Message messageId={messageId}/>}</CompanionSend>
      }
    </Box>
  );
}

function Message({messageId}) {

  const dispatch = useAppDispatch()
  const messageData = useAppSelector((state) =>
  selectItemById(state.chatRedusers.messages, messageId)
);
const isSelectedMessage = useAppSelector((state) => isSelectedMessagesSelector(state, messageId));
if (!messageData) return null;
const {message, adds, createdAt} = messageData
  return (
    <Box onClick={(e) => {
      console.log(messageId)
      dispatch(onAddReplyId(messageId))
    }}>
          <Paper sx={isSelectedMessage && {background: 'red'}}>
            <ReplyControl messageId={messageId}/>   
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
}

export default React.memo(MessageControl);
