import { Divider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from '../../../../../hooks/typedReduxHooks';
const ChatInfo = {
  roomId: 10,
  userIds: [1, 2, 3],
  createdAd: '30.01.2022',
  roomName: 'My Lovely room',
};

function ChatHeader() {
  // const chatInfo = useAppSelector((action) => action.chatSlice.cha)
return (
    <Box>
      <ChatLayout>
        <Typography sx={{ color: 'white' }} variant="h4">
          {ChatInfo.roomName}
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
