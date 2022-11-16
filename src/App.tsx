import React from 'react';
import { useTheme } from '@emotion/react';
import { Header } from './staticControls/Header/Header';
import "./styles.css"
import Footer from './staticControls/Footer/Footer';
import Box from '@mui/material/Box';
import Auth from './components/AuthContext/AuthContext';
import 'normalize.css';
import { mainStyles } from './styles';
 import "./fonts.css"
import PartyComponent from './components/PartyComponent/PartyComponent';

function App({ children }) {
  const theme = useTheme();
  const styles = mainStyles(theme)
  return (
    <Auth>
      <Box sx={styles.backgroundIcon}>
      <Box sx={styles.backgroundOverlay} 
        className="App">
        <Header />
        <Box
          sx={styles.mainPage}
        >
          <PartyComponent/>
          {children}
        </Box>
        <Footer />
      </Box>
      </Box>
    </Auth>
  );
}

export default App;
