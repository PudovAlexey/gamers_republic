import { Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BorderedButton } from '../../../../components/reusable/layout/Buttons';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { useAppDispatch } from '../../../../hooks/typedReduxHooks';
import { ERoutes } from '../../../../routes';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import {
  aboutStartLineSelector,
  aboutTitleProgressSelector,
} from '../../animations/lines/selectors';
import { SmoothTitle } from '../containers/SmoothTitle';
import background from './img/background.png';
import { PathLine } from './PathLine/PathLine';
function About() {
  const contentRef = useRef();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(
      setRef({
        type: 'aboutRef',
        ref: contentRef.current,
      })
    );
  });
  return (
    <Wrapper ref={contentRef}>
      <PathLine />
      <RelativeText>
        <SmoothTitle
          selector={aboutTitleProgressSelector}
          title={'ABOUT'}
          position={'right'}
          firstColor={'#0F1923'}
          secondColor={'#d93644'}
          startLineSelector={aboutStartLineSelector}
        />
      </RelativeText>
      <RelativeStack spacing={3}>
        <TextTypography>
          Each map is a playground to showcase your creative thinking.
          Purpose-built for team strategies, spectacular plays, and clutch
          moments. Make the play others will imitate for years to come.
        </TextTypography>
        <Link to={ERoutes.Register}>
          <BorderedButton variant="contained">Start Game</BorderedButton>
        </Link>
      </RelativeStack>
    </Wrapper>
  );
}

const RelativeText = styled(TitleText)({
  color: '#0f1923',
  position: 'absolute',
  right: '0',
  top: '0',
});

const Wrapper = styled(Box)({
  // padding: '0 10%',
  position: 'relative',
  height: '100vh',
  width: '100vw',
  background: `url(${background})`,
});

const TextTypography = styled(Typography)({
  maxWidth: '380px',
});

const RelativeStack = styled(Stack)({
  position: 'absolute',
  left: '10%',
  top: '25%',
});

export { About };
