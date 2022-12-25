import { Box } from '@mui/system';
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react';
import { IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/typedReduxHooks';
import store from '../../../../../../store';
import { onCloseReply } from '../../../../store/chatSlice';
import { replyAddsSelector, replyHeightSelector, replyMessageSelector, showReplySelector } from '../../../../store/selectors/chatSelector';
import { AddsViewer } from '../../../addsViewer/AddsViewer';
function ReplyMessage() {
  const dispatch = useAppDispatch()
  const showReply = useAppSelector(showReplySelector)
  const replyHeight = useAppSelector(replyHeightSelector)
  const replyMessage = useAppSelector(replyMessageSelector)
  const adds = useAppSelector(replyAddsSelector)
  if (!showReply) return null
  const {message, user} = replyMessage

  const ReplyPaper = styled(Paper)({
    height: replyHeight + 'px',
    width: '100%',
    background: "#FF4656",
    position: 'relative'
  })
  return (
    <ReplyPaper>
        <CloseReplyWrapper>
        <IconButton onClick={() => dispatch(onCloseReply())}>
          <CloseIcon />
        </IconButton>
        </CloseReplyWrapper>
      <ReplyContainer alignItems={'center'} direction={'row'} spacing={2}>
      <ReplyIcon fontSize='large' />
     <AddsWrapper>
     <AddsViewer showMoreButton={false} showCount={{
        img: 1,
        audio: 0
      }} adds={adds}/>
     </AddsWrapper>
        <Box>
          <Typography>{user.username}</Typography>
          <Typography>
            {message}
          </Typography>
        </Box>
      </ReplyContainer>
    </ReplyPaper>
  );
}

const CloseReplyWrapper = styled(IconButton)({
  position: 'absolute',
  right: '15px',
  top: '15px'
})

const AddsWrapper = styled(Box)({
  maxWidth: '70px',
  height: 'auto'
})

const ReplyContainer = styled(Stack)({
  maxHeight: '100%'
})


export { ReplyMessage };
