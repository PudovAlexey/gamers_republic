import { Box, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReplyIcon from '@mui/icons-material/Reply';
import { AddsViewer } from "../../../../../addsViewer/AddsViewer";
import { replyFirstMessageById } from "../../../../../../store/selectors/chatSelector";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";
import { REPLY_NAVIGATE } from "../../../../../../store/actionCreators";

function ReplyControl({messageId}) {
    const dispatch = useAppDispatch()
    const firstReplyMessage = useAppSelector((action) => replyFirstMessageById(action,messageId))
    if (!firstReplyMessage) return null
    const {message, adds, user} = firstReplyMessage
    const ReplyPaper = styled(Paper)({
        height: 70 + 'px',
        width: '100%',
        background: "#FF4656",
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
      })
    return (
        <ReplyPaper onClick={() => dispatch({
          type: REPLY_NAVIGATE,
          payload: {
            messageId: firstReplyMessage.messageId
          }
        })}>
          <ReplyContainer alignItems={'center'} direction={'row'} spacing={2}>
          <ReplyIcon fontSize='large' />
         <AddsWrapper>
         <AddsViewer showMoreButton={false} showCount={{
            img: 1,
            audio: 1,
            file: 1
          }} adds={adds}/>
         </AddsWrapper>
            <Box>
              <Typography>{user.username}</Typography>
            </Box>
          </ReplyContainer>
              <ReplyMessageTypography>
                {message}
              </ReplyMessageTypography>
        </ReplyPaper>
      );
}
  
  const AddsWrapper = styled(Box)({
    maxWidth: '70px',
    height: 'auto'
  })
  
  const ReplyContainer = styled(Stack)({
    maxHeight: '100%'
  })

  const ReplyMessageTypography = styled(Typography)({
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    maxWidth: '100%',
    position: 'relative',
    top: '-17px'

  })

export {
    ReplyControl
}