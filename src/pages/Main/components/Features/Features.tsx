import { Box, Stack, styled } from '@mui/system';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { BlockSlider } from './components/BlockSlider';
import { BlockText } from './components/BlockText';

function Features() {
  return (
    <Block>
      <RelativeText>Features</RelativeText>
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

const RelativeText = styled(TitleText)({
  position: 'absolute',
  right: '70px',
  top: '15px'
})

const Block = styled(Box)({
  position: 'relative',
  background: '#0F1923',
  width: '99vw',
  height: '100vh',
});

export { Features };
