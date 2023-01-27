import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import ReplyIcon from '@mui/icons-material/Reply';
// import { mainStyles } from 'src/styles';
import { AddsViewer } from "../../../../../addsViewer/AddsViewer";
import { replyFirstMessageById } from "../../../../../../store/selectors/chatSelector";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks";
import { REPLY_NAVIGATE } from "../../../../../../store/actionCreators";
import {mainStyles} from '../../../../../../../../../../styles'
import AvatarComponent from "../../../../../../../../../reusable/AvatarComponent/AvatarComponent";

function ReplyControl({messageId}) {
  const { palette } = useTheme();
  const styles = mainStyles(palette);
    const dispatch = useAppDispatch()
    const firstReplyMessage = useAppSelector((action) => replyFirstMessageById(action,messageId))
    if (!firstReplyMessage) return null
    const {message, adds, user} = firstReplyMessage
    const ReplyPaper = styled(Paper)({
        maxHeight: 84 + 'px',
        width: '100%',
        padding: '2px 0',
        background: "#d93644",
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
             
             <Stack direction={'row'} spacing={1}>
             <AvatarComponent {...user}/>
             <Typography>{user.username}</Typography> 
             </Stack>
          <Stack direction={'row'} alignItems={'center'}  spacing={1}>
            <ReplyIcon/>
              <Stack>
              <AddsWrapper>
          <AddsViewer showMoreButton={false} showCount={{
            img: 1,
            audio: 1,
            file: 1
          }} adds={adds}/>
         </AddsWrapper>
              </Stack>
            <ReplyMessageTypography  className='select'>
                 {message}
               </ReplyMessageTypography>
          </Stack>
        </ReplyPaper>
      );
}
  
  const AddsWrapper = styled(Box)({
    maxWidth: '70px',
    height: 'auto'
  })

  const ReplyMessageTypography = styled(Typography)({
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    maxWidth: '100%',

  })

export {
    ReplyControl
}