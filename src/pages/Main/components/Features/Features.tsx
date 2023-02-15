import { Box, Stack, styled } from '@mui/system';
import { useLayoutEffect, useRef } from 'react';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { $ } from '../../../../utils/DOM/DOM';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import {
  featuresStartLineSelector,
  featuresTitleProgressSelector,
} from '../../animations/lines/selectors';
import { BlockSlider } from './components/BlockSlider';
import { BlockText } from './components/BlockText';
import { PathLine } from './components/PathLine/Pathline';
function Features() {
  const contentRef = useRef();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(
      setRef({
        type: 'featuresRef',
        ref: contentRef.current,
      })
    );
  });

  return (
    <Block ref={contentRef}>
      <PathLine />
      <RelativeText>
        <SmoothTitle />
      </RelativeText>
      <Stack
        position={'relative'}
        top={'25vh'}
        height={'50%'}
        justifyContent={'center'}
        direction={'row'}
        spacing={10}
      >
        <BlockSlider />
        <BlockText />
      </Stack>
    </Block>
  );
}

function SmoothTitle() {
  const titleRef = useRef();
  const progress = useAppSelector(featuresTitleProgressSelector);
  const startLine = useAppSelector(featuresStartLineSelector);
  const startRect = startLine && $.rect(startLine);

  console.log(startRect);

  const Title = styled(TitleText)({
    position: 'absolute',
    background: `linear-gradient(290deg, #f8f8f8 ${progress}%, #d93644 ${
      progress === 0 ? 0 + 'px' : '100px'
    })`,
    left: startRect?.x + startRect?.width * 1.3 + 'px',
    top:
      startRect?.height - (titleRef?.current?.offsetHeight || 0) * 0.5 + 'px',
  });

  return <Title ref={titleRef}>{'Features'}</Title>;
}

const RelativeText = styled(Box)({
  position: 'absolute',
  left: '0',
  top: '0',
});

const Block = styled(Box)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  background: '#0F1923',
});

export { Features };
