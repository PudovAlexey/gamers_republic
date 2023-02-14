import styled from '@emotion/styled';
import { Box, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { RelatedGamesSlick } from './components/RelatedGamesSlick/RelatedGamesSlick';
import { popularGamesConfig } from './popularGamesConfig';
import girl from './assets/Girl.png';
import { PathLine } from './PathLine';
import { useAppDispatch } from '../../../../hooks/typedReduxHooks';
import { useLayoutEffect, useRef } from 'react';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import { gamesStartLineSelector, gameTitleProgressSelector } from '../../animations/lines/selectors';
import { SmoothTitle } from '../containers/SmoothTitle';
import { DecorativeCode } from './components/RelatedGamesSlick/DecorativeCode';

function PopularGames() {
  const contentRef = useRef();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(
      setRef({
        type: 'gamesRef',
        ref: contentRef.current,
      })
    );
  });

  return (
    <DarkPaper ref={contentRef}>
      <Wrapper>
        <PathLine />
        <DecorationGirl src={girl} alt={'girl'} />
        <RelativeTitle>
          <SmoothTitle
            title={'GAmes'}
            degs={70}
            selector={gameTitleProgressSelector}
            firstColor={'#d93644'}
            secondColor={'#f8f8f8'}
            startLineSelector={gamesStartLineSelector}
          />
        </RelativeTitle>
        <PaperWindow>
          <Stack spacing={3}>
            <Typography variant="h4">{popularGamesConfig.title}</Typography>
            <Typography>{popularGamesConfig.description}</Typography>
            <RelatedGamesSlick />
          </Stack>
        </PaperWindow>
      </Wrapper>
      <DecorationComponent>
          <DecorativeCode selector={gameTitleProgressSelector}/>
      </DecorationComponent>
    </DarkPaper>
  );
}

const RelativeTitle = styled(Box)({
  position: 'absolute',
  left: '6.5vw',
  top: '1vw',
});

const DecorationComponent = styled(Box)({
  position: 'absolute',
  bottom: '5vw',
  left: '15vw'
})

const DarkPaper = styled(Paper)({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  // padding: '0 10%',
  display: 'flex',
  alignItems: 'center',
  background: '#1F2326',
});

const Wrapper = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10%',
});

const PaperWindow = styled(Paper)({
  zIndex: 1,
  padding: '16px',
  maxWidth: '50%',
  maxHeight: '80%',
});

const DecorationGirl = styled('img')({
  position: 'absolute',
  right: '-10%',
  bottom: '0',
  top: '0',
  height: '100vh',
  width: 'auto',
});

export { PopularGames };
