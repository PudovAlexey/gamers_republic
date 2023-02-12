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
import { gameTitleProgressSelector } from '../../animations/lines/selectors';
import { SmoothTitle } from '../containers/SmoothTitle';

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
      <DecorationGirl src={girl} alt={'girl'} />
      <PathLine />
      <RelativeTitle>
        <SmoothTitle
        title={"GAmes"}
        degs={70}
        selector={gameTitleProgressSelector}
        firstColor={"#d93644"}
        secondColor={"#f8f8f8"}
        />
      </RelativeTitle>
      <PaperWindow>
        <Stack spacing={3}>
          <Typography variant="h4">{popularGamesConfig.title}</Typography>
          <Typography>{popularGamesConfig.description}</Typography>
          <RelatedGamesSlick />
        </Stack>
      </PaperWindow>
    </DarkPaper>
  );
}

const RelativeTitle = styled(Box)({
    position: 'absolute',
    left: '8vw',
    top: '15px',
  });

const DarkPaper = styled(Paper)({
  position: 'relative',
  padding: '0 10%',
  display: 'flex',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: '#1F2326',
});

const PaperWindow = styled(Paper)({
  zIndex: 1,
  padding: '16px',
  maxWidth: '50%',
  maxHeight: '80%',
});

const DecorationGirl = styled('img')({
  position: 'absolute',
  right: '10%',
  bottom: '0',
  top: '0',
  height: '100vh',
  width: 'auto',
});

export { PopularGames };
