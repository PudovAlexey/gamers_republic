import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import ReplyIcon from '@mui/icons-material/Reply';
// import { mainStyles } from 'src/styles';
import { AddsViewer } from "../../../../../addsViewer/AddsViewer";
import { replyFirstMessageById } from "../../../../../../store/selectors/chatSelector";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";
import { REPLY_NAVIGATE } from "../../../../../../store/actionCreators";
import {mainStyles} from '../../../../../../../../../../styles'

function ReplyControl({messageId}) {
  const { palette } = useTheme();
  const styles = mainStyles(palette);
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
          type: REPLY_NAVIGATE().type,
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
            <Box  sx={{
              ...styles.select
            }}>
              <Typography>{user.username}</Typography>
            </Box>
          </ReplyContainer>
              <ReplyMessageTypography  className='select'>
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