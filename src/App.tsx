import React from 'react';
import { useTheme } from '@emotion/react';
import  Game  from './games/arcanoid/Game';
import { Header } from './staticControls/Header/Header';
import Footer from './staticControls/Footer/Footer';
import Box from "@mui/material/Box";

function App({children}) {
  const theme = useTheme()
  return (
    <Box className="App">
      <Header/>
      {children}
      <Footer/>
    </Box>
  );
}

export default App;
