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
  messagesIdsSelector,
  replyHeightSelector,
  showReplySelector,
} from '../../store/selectors/chatSelector';
import {
  SELECT_MESSAGES,
  UPLOAD_MESSAGES,
  UPLOAD_MESSAGES_BY_OFFSET,
} from '../../store/actionCreators';
import React, { useContext, useRef } from 'react';
import { mainStyles } from '../../../../../../styles';
import { useTheme } from '@mui/material';
import { AuthContext } from '../../../../../AuthContext/AuthContext';
import { onInit } from '../../store/chatSlice';
import { scrollService } from "../../services/scrollService/scrollService"

function MessagesList() {
  const [AuthUser] = useContext(AuthContext)
  const { palette } = useTheme();
  const styles = mainStyles(palette);
  const showReply = useAppSelector(showReplySelector);
  const replyHeight = useAppSelector(replyHeightSelector);
  const messageContainer = useRef()
  const dispatch = useAppDispatch()
  React.useEffect(() => {
      if (AuthUser?.roomId) {
          dispatch(onInit({
            scrollService,
              roomId: AuthUser?.roomId,
              messageContainer: messageContainer.current
          }))
          
          dispatch(UPLOAD_MESSAGES({
              roomId: AuthUser?.roomId
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
          <Messages />
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
