import { Grid, styled, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { LabelCard } from '../../../../components/reusable/LabelCard/LabelCard';
import { cardsConfig } from './cardsConfig';
import mainGirl from '../svg/Jett.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StrokeText } from '../../../../components/reusable/layout/Typography';
import { Link } from 'react-router-dom';
import { BorderedButton } from '../../../../components/reusable/layout/Buttons';
import { ERoutes } from '../../../../routes';

function LogoComponent() {
  // return (
  //   <Stack alignItems={'center'} direction={'row'} justifyContent={'center'}>
  //       <MainGirl src={mainGirl} alt={'mainGirl'} />
  //     <MainBox>
  //       <Stack position={'inherit'} zIndex={1} alignItems={'center'} spacing={2}>
  //         <TitleStack
  //           justifyContent={'center'}
  //           alignItems={'center'}
  //           spacing={1}
  //         >
  //           <StrokeText fontSize={'7vw'} textAlign={'center'} variant="h1">GAMERS REPUBLIC</StrokeText>
  //           <Typography textAlign={'center'} variant="h4">
  //             Let's start your adventure in the world of games and entertainment
  //           </Typography>
  //         </TitleStack>
  //       </Stack>
  //       <BottomBlock>
  //       <GridComponent
  //         maxWidth={"70%"}
  //         gap={3}
  //         gridTemplateColumns={'1fr 1fr'}
  //         display={'grid'}
  //       >
  //         {cardsConfig.map((card) => (
  //           <LabelCard {...card} />
  //         ))}
  //       </GridComponent>
  //       <StartJourneyButton>
  //         <Stack justifyContent={'center'} alignItems={'center'}>
  //           <Link to={ERoutes.Register}>
  //             <BorderedButton
  //               sx={{ background: '#ece8e1', color: '#1F2326' }}
  //               variant="contained"
  //               startIcon={<KeyboardArrowRightIcon />}
  //             >
  //               <Typography>Start journey</Typography>
  //             </BorderedButton>
  //           </Link>
  //         </Stack>
  //       </StartJourneyButton>
  //       </BottomBlock>
  //     </MainBox>
  //     <Link to={ERoutes.Register}></Link>
  //   </Stack>
  // );
  return (
    <MainBox>
      <MainGirl src={mainGirl} alt={'mainGirl'} />
      <BlockWrapper>
        <TitleStack justifyContent={'center'} alignItems={'center'} spacing={1}>
          <StrokeText fontSize={'7vw'} textAlign={'center'} variant="h1">
            GAMERS REPUBLIC
          </StrokeText>
          <Typography textAlign={'center'} variant="h4">
            Let's start your adventure in the world of games and entertainment
          </Typography>
        </TitleStack>
        <BottomBlock>
          <GridComponent
            maxWidth={'70%'}
            gap={3}
            gridTemplateColumns={'1fr 1fr'}
            display={'grid'}
          >
            {cardsConfig.map((card) => (
              <LabelCard {...card} />
            ))}
          </GridComponent>
          <StartJourneyButton>
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Link to={ERoutes.Register}>
                <BorderedButton
                  sx={{ background: '#ece8e1', color: '#1F2326' }}
                  variant="contained"
                  startIcon={<KeyboardArrowRightIcon />}
                >
                  <Typography>Start journey</Typography>
                </BorderedButton>
              </Link>
            </Stack>
          </StartJourneyButton>
        </BottomBlock>
      </BlockWrapper>
    </MainBox>
  );
}

const MainBox = styled(Box)({
  padding: '8px 8px',
  position: 'relative',
  minHeight: 'calc(100vh - 62px)',
  width: '100vw',
});

const BlockWrapper = styled(Box)({
  zIndex: 1,
  position: 'inherit',
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: 'calc(100vh - 62px)',
  flexDirection: 'column',
});

const BottomBlock = styled(Box)({
  padding: '8px 8px',
  position: 'relative',
});

const TitleStack = styled(Stack)({
  margin: 'auto',
  top: '-60%',
  bottom: 0,
  left: 0,
  right: 0,
});

const StartJourneyButton = styled(Box)({});

const GridComponent = styled(Grid)({
  padding: '0 30px'
  // position: 'absolute',
  // left: '0',
  // bottom: '37%',
  // height: '30%',
});

const MainGirl = styled('img')({
  position: 'absolute',
  height: '100%',
  width: 'auto',
  right: '-10%',
  top: '0',
});

export { LogoComponent };
