import React, { useCallback, useMemo } from 'react';
import { Box } from '@mui/system';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import { ChatContainer, ScrollContainer } from './containers/baseContainers';
import MessageControl from './controls/Message/Message';
import { TopProgress } from './containers/TopProgress';
import { BottomProgress } from './containers/BottomProgress';
import {
  chatHeightSelector,
  messagesIdsSelector,
  replyHeightSelector,
  showReplySelector,
} from '../../store/selectors/chatSelector';
import { UPLOAD_MESSAGES_BY_OFFSET } from '../../store/actionCreators';
import { useState } from 'react';
import { useEffect } from 'react';

function MessagesList({ messageContainer }) {
  const dispatch = useAppDispatch();
  const showReply = useAppSelector(showReplySelector);
  const replyHeight = useAppSelector(replyHeightSelector);
  const chatHeight = useAppSelector(chatHeightSelector);
  return (
    <Box>
      <TopProgress />
      <ScrollContainer
        ref={messageContainer}
        sx={
          showReply && {
            height: `${chatHeight - replyHeight}` + 'px',
            minHeight: `${chatHeight - replyHeight}` + 'px',
          }
        }
        onScroll={() =>
          dispatch({
            type: UPLOAD_MESSAGES_BY_OFFSET,
          })
        }
      >
        <ChatContainer>
          <Messages />
        </ChatContainer>
      </ScrollContainer>
      <BottomProgress />
    </Box>
  );
}

function Messages() {
  const messageIds = useAppSelector(messagesIdsSelector);
  const [state, setState] = useState([]);
  let index = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.length && messageIds[0]) {
        setState(messageIds);
      } else {
        requestAnimationFrame(() => {
          return setState((pr) => {
            const lastMessage = pr[pr.length - 1];
            const nextMessage = messageIds.findIndex((m) => lastMessage > m);
            const selectMessages = messageIds.slice(
              nextMessage,
              nextMessage + 1
            );
            return nextMessage >= 0 ? [...pr, ...selectMessages] : pr;
          });
        });
      }
      index++;
      if (index >= messageIds.length) {
        clearInterval(interval);
      }
    }, 0);

    return () => {
      clearInterval(interval);
    };
  }, [messageIds, index, state.length]);
  return (
    <React.Fragment>
      {
        state.map((id, idx) => (
          <MessageControl key={`${id}_${idx}`} messageId={id} />
        ))
      }
    </React.Fragment>
  )
}

export default MessagesList;
