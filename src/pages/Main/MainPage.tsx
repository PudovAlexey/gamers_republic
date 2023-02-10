import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { INIT_ANIMATION } from './animations/lines/actionCreators';
import { About } from './components/About/About';
import { Features } from './components/Features/Features';
import { LogoComponent } from './components/Logo/Logo';
import { PopularGames } from './components/PopularGames/PopularGames';
import { WhatsNew } from './components/WhatsNew/WhatsNew';


function MainPage() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({
      type: INIT_ANIMATION().type
    })
  })
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
