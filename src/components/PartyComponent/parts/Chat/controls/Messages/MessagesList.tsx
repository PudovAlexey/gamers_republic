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
  isSearchEmptySelector,
  messagesIdsSelector,
  replyHeightSelector,
  showReplySelector,
} from '../../store/selectors/chatSelector';
import {
  ROOM_INIT,
  SELECT_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../../store/actionCreators';
import React, { useContext, useRef } from 'react';
import { mainStyles } from '../../../../../../styles';
import { useTheme } from '@mui/material';
import { AuthContext } from '../../../../../AuthContext/AuthContext';
import { MessageEmptySearch } from './controls/Message/MessageEmptySearch';

function MessagesList() {
  const [AuthUser] = useContext(AuthContext)
  const { palette } = useTheme();
  const styles = mainStyles(palette);
  const showReply = useAppSelector(showReplySelector);
  const replyHeight = useAppSelector(replyHeightSelector);
  const isSearchEmpty = useAppSelector(isSearchEmptySelector)
  const messageContainer = useRef()
  const dispatch = useAppDispatch()
  React.useEffect(() => {
      if (AuthUser?.roomId) {
        dispatch(ROOM_INIT({
          roomId: AuthUser?.roomId,
          messageContainer: messageContainer.current
        }))
      }
      return () => {
          // dispatch(onExit())
      }
  })
  return (
    <Box>
      <TopProgress />
      <Box>
      <ScrollContainer
        ref={messageContainer}
        sx={{
          ...styles.noSelect,
          ...(showReply && {
            maxHeight: `calc(100vh - ${380 + replyHeight}px)`,
            minHeight: `calc(100vh - ${380 + replyHeight}px)`,
          }
          ),
        }}
        onScroll={() =>
          dispatch({
            type: UPLOAD_MESSAGES_BY_OFFSET().type,
          })
        }
        onMouseDown={(e) => {
          dispatch(SELECT_MESSAGES(e));
        }}
      >
        <ChatContainer>
         {isSearchEmpty ? <MessageEmptySearch/> : <Messages />}
        </ChatContainer>
      </ScrollContainer>
      </Box>
      <BottomProgress />
    </Box>
  );
}

 const Messages = function Messages() {
  const messageIds = useAppSelector(messagesIdsSelector);
  return (
    <React.Fragment>
      {messageIds.map((id) => (
         <MessageControl key={id} messageId={id} />
      ))}

    </React.Fragment>
  );
}

export default MessagesList
