import React from 'react';
import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
function Footer() {
  return (
    <Box
      sx={{
        height: '150px',
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
          © 2022 ООО «Pudov Aleksey Aleksandrovich». All Rights Reserved.
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
}

export default Footer;
