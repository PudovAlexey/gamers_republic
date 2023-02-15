import { Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BorderedButton } from '../../../../components/reusable/layout/Buttons';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { ERoutes } from '../../../../routes';
import { $ } from '../../../../utils/DOM/DOM';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import {
  aboutStartLineSelector,
  aboutTitleProgressSelector,
} from '../../animations/lines/selectors';
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
        <SmoothTitle />
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

function SmoothTitle() {
  const titleRef = useRef();
  const progress = useAppSelector(aboutTitleProgressSelector);
  const altProgress = 100 - Number(progress);
  const startLine = useAppSelector(aboutStartLineSelector);
  const startRect = startLine && $.rect(startLine);

  const Title = styled(TitleText)({
    position: 'absolute',
    background: `linear-gradient(75deg, #0F1923 ${progress}%, #d93644 ${progress === 0 ? 0 + 'px' : "100px"})`,
    left: startRect?.x - (titleRef?.current?.offsetWidth || 0)  * 1 + 'px',
    top: startRect?.height / 2 + 'px',
  });

  return <Title ref={titleRef}>{'ABOUT'}</Title>;
}

const RelativeText = styled(TitleText)({
  color: '#0f1923',
  position: 'absolute',
  left: '0',
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
