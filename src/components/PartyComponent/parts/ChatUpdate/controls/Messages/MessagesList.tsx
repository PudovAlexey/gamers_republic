import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { onChatScroll } from '../../store/chatSlice';
import { ChatContainer, ScrollContainer } from './containers/baseContainers';
import { Message } from './controls/Message/Message';

function MessagesList() {
    const dispatch = useAppDispatch()
  const messageIds = useAppSelector((action) => action.messagesSlice);
  return (
    <ScrollContainer onScroll={(e) => dispatch(onChatScroll(e))}>
      <ChatContainer>
      {messageIds.map((messageId) => (
        <Box data-messageid={messageId}>
            <Message key={messageId} messageId={messageId} />
        </Box>
      ))}
      </ChatContainer>
    </ScrollContainer>
  );
}

export { MessagesList };
