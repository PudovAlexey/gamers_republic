import { Box } from '@mui/system';
import { About } from './components/About/About';
import { Features } from './components/Features/Features';
import { LogoComponent } from './components/Logo/Logo';
import { PopularGames } from './components/PopularGames/PopularGames';
import { WhatsNew } from './components/WhatsNew/WhatsNew';


function MainPage() {
  return (
    <Box>
      <LogoComponent/>
      <PopularGames/>
      <Features/>
      <WhatsNew/>
      <About/>
    </Box>
  );
}

export default MainPage;
