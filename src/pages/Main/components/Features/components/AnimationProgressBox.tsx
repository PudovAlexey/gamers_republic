import { Box, Stack, styled } from '@mui/system';
import { useLayoutEffect } from 'react';
import {
  LightTypography,
  TextBoldLight,
} from '../../../../../components/reusable/layout/Typography';

function AnimationProgressBox({ title, description }) {
  useLayoutEffect(() => {

  })
  return (
    <AnimationBox>
      <Stack spacing={3}>
        <TextBoldLight>{title}</TextBoldLight>
        <DescriptionText maxWidth={'150px !important'}>
          {description}
        </DescriptionText>
      </Stack>
    </AnimationBox>
  );
}

const AnimationBox = styled(Box)({
  background: '#d93644',
  padding: '8px',
});

const DescriptionText = styled(LightTypography)({
  maxWidth: '365px',
  fontStyle: 'italic',
  color: '#1F2326',
});

export { AnimationProgressBox };
