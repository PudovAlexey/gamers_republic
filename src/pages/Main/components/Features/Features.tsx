import { Box, Stack, styled } from '@mui/system';
import { BlockSlider } from './components/BlockSlider';
import { BlockText } from './components/BlockText';

function Features() {
  return (
    <Block>
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

const Block = styled(Box)({
  background: '#0F1923',
  width: '99vw',
  height: '100vh',
});

export { Features };
