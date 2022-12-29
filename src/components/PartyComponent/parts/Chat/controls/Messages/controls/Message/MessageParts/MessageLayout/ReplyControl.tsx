import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReplyIcon from '@mui/icons-material/Reply';
import { AddsViewer } from "../../../../../addsViewer/AddsViewer";
import { replyFirstMessageById } from "../../../../../../store/selectors/chatSelector";
import { useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";

function ReplyControl({messageId}) {
    const firstReplyMessage = useAppSelector((action) => replyFirstMessageById(action,messageId))
    console.log(firstReplyMessage, 'replyData')
    if (!firstReplyMessage) return null
    const {message, adds, user} = firstReplyMessage
    const ReplyPaper = styled(Paper)({
        height: 30 + 'px',
        width: '100%',
        background: "#FF4656",
        position: 'relative'
      })
    return (
        <ReplyPaper>
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
  
  const AddsWrapper = styled(Box)({
    maxWidth: '70px',
    height: 'auto'
  })
  
  const ReplyContainer = styled(Stack)({
    maxHeight: '100%'
  })

export {
    ReplyControl
}