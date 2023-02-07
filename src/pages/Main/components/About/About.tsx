import { Button, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import background from './img/background.png'

function About() {
  return (
    <Wrapper>
      <RelativeStack spacing={3}>
        <TitleTypography variant="h1">ABOUT</TitleTypography>
        <TextTypography>
          Each map is a playground to showcase your creative thinking.
          Purpose-built for team strategies, spectacular plays, and clutch
          moments. Make the play others will imitate for years to come.
        </TextTypography>
        <Link to={'/register'}>
        <Button>
            Start Game
        </Button>
        </Link>
      </RelativeStack>
    </Wrapper>
  );
}

const Wrapper = styled(Box)({
    position: 'relative',
  height: '100vh',
  width: '100vw',
  background: `url(${background})`
});

const TextTypography = styled(Typography)({
    maxWidth: '380px'
})

const RelativeStack = styled(Stack)({
    position: 'absolute',
    left: '10%',
    top: '25%'
})

const TitleTypography = styled(Typography)({});

export { About };
