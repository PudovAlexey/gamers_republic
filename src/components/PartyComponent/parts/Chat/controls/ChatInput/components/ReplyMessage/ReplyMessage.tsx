import { Box } from '@mui/system';
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react';
import { IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/typedReduxHooks';
import store from '../../../../../../store';
import { ShowFirstAdd } from './ShowFirstAdd';
function ReplyMessage() {
  const dispatch = useAppDispatch()
  const showReply = useAppSelector(store => store.chatRedusers.chatSlice.showReply)
  const replyMessage = useAppSelector(store => store.chatRedusers.chatSlice.replyMessage)
  if (!showReply) return null
  const {message, user} = replyMessage
  return (
    <ReplyPaper>
        <CloseReplyWrapper>
        <CloseIcon />
        </CloseReplyWrapper>
      <Stack alignItems={'center'} direction={'row'} spacing={2}>
      <ReplyIcon size="lg" />
        <ShowFirstAdd/> 
        <Box>
          <Typography>{user.username}</Typography>
          <Typography>
            {message}
          </Typography>
        </Box>
      </Stack>
    </ReplyPaper>
  );
}

const ReplyPaper = styled(Paper)({
  background: "#FF4656",
  position: 'relative'
})

const CloseReplyWrapper = styled(IconButton)({
  position: 'absolute',
  right: '15px',
  top: '15px'
})

export { ReplyMessage };
