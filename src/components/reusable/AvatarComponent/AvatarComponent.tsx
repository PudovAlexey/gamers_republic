import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { type } from '@testing-library/user-event/dist/type';

type TControlType = {
  userName?: string,
  avatarSrc?: string,
  name?: string,
  surname?: string
}

function AvatarComponent({ userName, avatarSrc, name, surname }: TControlType) {
  return userName ? (
    <Box>
      <Avatar src={avatarSrc}>
        {name[0]}
        {surname[0]}
      </Avatar>
      <Typography>{userName}</Typography>
    </Box>
  ) : (
    <Avatar src={PersonIcon}></Avatar>
  );
}

export default AvatarComponent;
