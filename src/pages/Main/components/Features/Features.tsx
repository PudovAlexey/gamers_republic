import { Box, Stack, styled } from '@mui/system';
import { useLayoutEffect, useRef } from 'react';
import { useAppDispatch } from '../../../../hooks/typedReduxHooks';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import { featuresStartLineSelector, featuresTitleProgressSelector } from '../../animations/lines/selectors';
import { SmoothTitle } from '../containers/SmoothTitle';
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
        <SmoothTitle
          selector={featuresTitleProgressSelector}
          position={'right'}
          title={'Features'}
          firstColor={'#f8f8f8'}
          secondColor={'#d93644'}
          startLineSelector={featuresStartLineSelector}
        />
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

const RelativeText = styled(Box)({
  position: 'absolute',
  right: '0',
  top: '0',
});

const Block = styled(Box)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  background: '#0F1923',
});

export { Features };