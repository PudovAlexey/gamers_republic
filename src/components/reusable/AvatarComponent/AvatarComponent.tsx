import { Avatar, styled, Typography } from '@mui/material';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import { TUser } from '../../../api/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/typedReduxHooks';
import { CHECK_USER_ONLINE } from '../../../store/authSlice/actionCreators';
import { userOnlineByIdSelector } from '../../../store/authSlice/selectors';


type TControlProps = TUser & {
  sx?: Record<string, string | number>
  showUserName?: boolean
}

function AvatarComponent({ username, avatar, name, surname, sx={}, showUserName = false, id }: TControlProps) {
  const userOnline = useAppSelector((state) => userOnlineByIdSelector(state, id))
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(CHECK_USER_ONLINE({
      userId: id
    }))
  })
  const theme = useTheme()
  const styles = styleComponent(theme)
  return username ? (
    <Box sx={{
      ...styles.avatar,
      ...sx
    }}>
      <RelativeBox>
      {userOnline && <OnlineCircle/>}
      <Avatar src={avatar}>
        {name?.length && surname?.length ? `${name[0]}${surname[0]}` : username[0]}
      </Avatar>
      </RelativeBox>
      {showUserName && <Typography>{username}</Typography>}
    </Box>
  ) : (
    <Avatar><PersonIcon/></Avatar>
  );
}

const RelativeBox = styled(Box)({
  position: 'relative'
})

const OnlineCircle = styled(Box)({
  position: 'absolute',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#32CD32',
  right: '-2px',
  top: '5'
})

export default AvatarComponent;
