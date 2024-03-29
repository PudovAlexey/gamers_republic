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
 import './types.d.ts'
import PartyComponent from './components/PartyComponent/PartyComponent';
import { DebugPanel } from './utils/enviroment/debugPanel/components/DebugPanel';

function App({ children }) {
  const theme = useTheme();
  const styles = mainStyles(theme)
  return (
    <Auth>
      <Box sx={styles.backgroundIcon}>
      <Box sx={styles.backgroundOverlay} 
        className="App">
        <Header />
        <Box>
          <PartyComponent/>
          {children}
        </Box>
        <Footer />
        <DebugPanel/>
      </Box>
      </Box>
    </Auth>
  );
}

export default App;
