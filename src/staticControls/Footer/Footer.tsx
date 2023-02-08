import React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const socialMediaIcons = [
  {
    icon: <InstagramIcon />,
    url: 'https://instagram.com/alex_web177?igshid=Zjc2ZTc4Nzk=',
  },
  {
    icon: <GitHubIcon />,
    url: 'https://github.com/PudovAlexey/gamers_republic',
  },
  {
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/me?trk=p_mwlite_me_notifications-secondary_nav',
  },
  { icon: <TelegramIcon />, url: 'https://t.me/Alexej177' },
];
function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'inherit',
        background: '#1F2326',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          height: '200px',
          width: '200px',
          bottom: '-100px',
          left: '170px',
          borderRadius: '50%',
          background: '#fff',
        }}
      ></Box>
      <Box
        sx={{
          padding: '46px 73px 0 46px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'end',
            maxWidth: '250px',
            textAlign: 'center',
          }}
        >
          <Stack alignItems={'center'} spacing={3}>
            <Stack direction={'row'} spacing={1}>
              {socialMediaIcons.map(({ icon, url }) => (
                <a target="_blank" href={url}>
                  <IconButton size="small">{icon}</IconButton>
                </a>
              ))}
            </Stack>
            <Stack alignItems={'center'} spacing={1}>
              <Typography sx={{ color: '#7e7e7e' }}>
                © 2022 ООО «Pudov Aleksey Aleksandrovich»
              </Typography>
              <Typography sx={{ color: '#7e7e7e' }}>
                All Rights Reserved.
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Footer;
