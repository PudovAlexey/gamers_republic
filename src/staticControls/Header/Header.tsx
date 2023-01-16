import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { MenuList } from '@mui/material';
import Logo from '../../assets/main/Logo';
import AuthorLogo from '../../assets/main/AuthorLogo';
import AvatarComponent from '../../components/reusable/AvatarComponent/AvatarComponent';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import { menuItems } from './menuItems';
import useLocalStorage from '../../hooks/useLocalStorage';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';

const Header = () => {
  const [AuthUser, setAuthUser] = useContext(AuthContext);
  const {removeItemByPath} = useLocalStorage()
  const pallete = useTheme()
  const styles = styleComponent(pallete)

  function onOpenTeamMenuPopover() {
    
  }

  function onLogoutPress() {
    setAuthUser(null)
    removeItemByPath('authToken')
  }
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box
        sx={{
          padding: '10px 73px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '150px',
              marginRight: '86px',
            }}
          >
            <Logo />
            <Box
              sx={{
                background: '#FFFFFF',
                height: 42,
                width: 2,
              }}
            ></Box>
            <AuthorLogo />
          </Box>
          <MenuList
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {menuItems.map((page) => (
              <MenuItem key={page.route}>
                <Link to={page.route}>{page.text}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
        <Box sx={styles.header.userInfo}>
          <AvatarComponent {...AuthUser} />
          {AuthUser ? (
            <MenuItem>
              <Link to="/login">Login</Link>
            </MenuItem>
          ) :
           <Button onClick={onLogoutPress}>Logout</Button>
          }
          {
            AuthUser ? (
              <MenuItem>
                <Button onClick={onOpenTeamMenuPopover}>Add Friends</Button>
              </MenuItem>
            ) : null
          }
        </Box>
      </Box>
    </AppBar>
  );
};
export { Header };
