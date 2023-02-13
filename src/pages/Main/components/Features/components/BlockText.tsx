import { Box, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  LightTypography,
  TextBoldLight,
} from '../../../../../components/reusable/layout/Typography';
import { blockTextConfig } from './config';

function BlockText() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <LightTypography>
          //:{blockTextConfig.title.toUpperCase()}/
        </LightTypography>
        <DescriptionText>{blockTextConfig.description}</DescriptionText>
      </Stack>
      <Stack direction={'row'} spacing={4}>
        {blockTextConfig.featureBlock.map((props) => (
          <AnimationProgressBox {...props} />
        ))}
      </Stack>
    </Stack>
  );
}

function AnimationProgressBox({ title, description }) {
  return (
    <AnimationBox>
      <Stack spacing={3}>
        <TextBoldLight>{title}</TextBoldLight>
        <DescriptionText color={'#1F2326'} maxWidth={'150px !important'}>
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
});

export { BlockText };
