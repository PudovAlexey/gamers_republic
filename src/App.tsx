import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import  Game  from './games/arcanoid/Game';
import { Header } from './staticControls/Header/Header';
import Footer from './staticControls/Footer/Footer';
import Box from "@mui/material/Box";
import Auth from './components/AuthContext/AuthContext';

function App({children}) {
  const theme = useTheme()

  return (
    <Auth>
      <Box className="App">
      <Header/>
      {children}
      <Footer/>
    </Box>
    </Auth>
  );
}

export default App;
