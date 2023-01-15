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
import {
  SELECT_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../../store/actionCreators';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainStyles } from 'src/styles';
import { useTheme } from '@mui/material';

function MessagesList({ messageContainer }) {
  const { palette } = useTheme();
  const styles = mainStyles(palette);
  const dispatch = useAppDispatch();
  const showReply = useAppSelector(showReplySelector);
  const replyHeight = useAppSelector(replyHeightSelector);
  const chatHeight = useAppSelector(chatHeightSelector);
  return (
    <Box>
      <TopProgress />
      <ScrollContainer
        ref={messageContainer}
        sx={{
          ...styles.noSelect,
          ...(showReply && {
            height: `${chatHeight - replyHeight}` + 'px',
            minHeight: `${chatHeight - replyHeight}` + 'px',
          }),
        }}
        onScroll={() =>
          dispatch({
            type: UPLOAD_MESSAGES_BY_OFFSET,
          })
        }
        onMouseDown={(e) => {
          dispatch({
            type: SELECT_MESSAGES,
            payload: e,
          });
        }}
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
  const loadMessages = useAppSelector(
    (state) => state.chatSlice.loadMessageIds
  );
  const [state, setState] = useState([]);
  let index = 0;
  useEffect(() => {
    if (loadMessages.length) {
      setState((pr) => {
        const clone = [...pr];
        const filterMessages = loadMessages.filter((m) => !pr.includes(m));
        clone.unshift(...filterMessages);
        return clone;
      });
    }
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
      {state.map((id) => (
        <MessageControl key={id} messageId={id} />
      ))}
    </React.Fragment>
  );
}

export default MessagesList;
