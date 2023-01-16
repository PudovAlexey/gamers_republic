import { Divider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from '../../../../../hooks/typedReduxHooks';
import { chatInfoSelector } from '../store/selectors/chatSelector';

function ChatHeader() {
  const chatInfo = useAppSelector(chatInfoSelector);
  return (
    <Box>
      <ChatLayout>
        <Typography sx={{ color: 'white' }} variant="h4">
          {chatInfo.roomName}
        </Typography>
      </ChatLayout>
      <Divider />
    </Box>
  );
}

const ChatLayout = styled(Box)({
  height: '70px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export { ChatHeader };
