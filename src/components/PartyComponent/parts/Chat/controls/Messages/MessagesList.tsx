import React, { useCallback, useMemo } from 'react';
import { Box } from '@mui/system';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import { fetchMessages } from '../../store/messagesSlice';
import { ChatContainer, ScrollContainer } from './containers/baseContainers';
import Message from './controls/Message/Message';
import { TopProgress } from './containers/TopProgress';
import { BottomProgress } from './containers/BottomProgress';

function MessagesList() {
  const dispatch = useAppDispatch();
  const scrollService = useAppSelector(
    (actions) => actions.chatSlice.scrollService
  );
  const roomId = useAppSelector((actions) => actions.chatSlice.roomId);

  const scroll = useCallback(
    (e) => {
      const messagesData = scrollService;
      const { scrollTop, scrollHeight } = e.target;
      const { scrollDirection, queryMessage } = messagesData.update(e.target);
      if (scrollTop < -1100) {
        dispatch(
          fetchMessages({
            roomId,
            messageStart: queryMessage,
            offset: 20,
            where: scrollDirection,
          })
        );
      }
    },
    [dispatch, scrollService, roomId]
  );
  return (
    <Box>
      <TopProgress />
      <ScrollContainer onScroll={(e) => scroll(e)}>
        <ChatContainer>
          <Messages />
        </ChatContainer>
      </ScrollContainer>
      <BottomProgress />
    </Box>
  );
}

function Messages() {
  const messageIds = useAppSelector((action) => action.messagesSlice);
  const memoizedItems = useMemo(() => {
    return messageIds.map((messageId) => {
      const messageByMessageId = () => messageId;
      return React.memo(messageByMessageId);
    });
  }, [messageIds]);

  let itemarray = [];
  for (const MemoizedItem of memoizedItems) {
    const memoId = MemoizedItem.type();
    itemarray.push(<Message key={memoId} messageId={memoId} />);

  }
  return <React.Fragment>{itemarray}</React.Fragment>;
}

export default MessagesList;
