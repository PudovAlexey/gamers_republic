import { Box, styled, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  LightTypography,
  TextBoldLight,
} from '../../../../../components/reusable/layout/Typography';
import { AnimationProgressBox } from './AnimationProgressBox';
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

const DescriptionText = styled(LightTypography)({
  maxWidth: '365px',
  fontStyle: 'italic',
});



export { BlockText };
