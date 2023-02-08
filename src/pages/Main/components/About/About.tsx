import { Button, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { BorderedButton } from '../../../../components/reusable/layout/Buttons';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { ERoutes } from '../../../../routes';
import background from './img/background.png';

function About() {
  return (
    <Wrapper>
        <RelativeText>ABOUT</RelativeText>
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
  right: '70px',
  top: '15px'
})

const Wrapper = styled(Box)({
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
