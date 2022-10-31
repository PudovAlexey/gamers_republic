import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function AvatarComponent({ userName, avatarSrc, name, surname }) {
  console.log(userName)
  return userName ? (
    <Box>
      {/* <Avatar src={avatarSrc}>
        {name[0]}
        {surname[0]}
      </Avatar> */}
      <Typography>{userName}</Typography>
    </Box>
  ) : (
    <Avatar src={PersonIcon}></Avatar>
  );
}

export default AvatarComponent;
