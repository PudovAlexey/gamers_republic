import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import  Game  from './games/arcanoid/Game';
import { Header } from './staticControls/Header/Header';
import Footer from './staticControls/Footer/Footer';
import Box from "@mui/material/Box";
import Auth from './components/AuthContext/AuthContext';
import "normalize.css";

function App({children}) {
  const theme = useTheme()

  return (
    <Auth>
      <Box sx={{
        position: "relative",
        background: "url(/main/background.jpg)",
        overflow: "hidden"
      }} className="App">
      <Header/>
      <Box sx={{
        minHeight: "calc(100vh - 280px)",
      }}>
      {children}
      </Box>
      <Footer/>
    </Box>
    </Auth>
  );
}

export default App;
