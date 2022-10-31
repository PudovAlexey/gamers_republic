import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';

type TControlProps = {
  username: string
  avatar?: string,
  name?: string,
  surname?: string
}

function AvatarComponent({ username, avatar, name, surname }: TControlProps) {
  const theme = useTheme()
  const styles = styleComponent(theme)
  return username ? (
    <Box sx={styles.avatar}>
      <Avatar src={avatar}>
        {name?.length && surname?.length ? `${name[0]}${surname[0]}` : username[0]}
      </Avatar>
      <Typography>{username}</Typography>
    </Box>
  ) : (
    <Avatar><PersonIcon/></Avatar>
  );
}

export default AvatarComponent;
