import { Button, Grid, Paper, styled, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { LabelCard } from "../../../../components/reusable/LabelCard/LabelCard"
import { cardsConfig } from "./cardsConfig"
import mainGirl from '../svg/Jett.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StrokeText } from "../../../../components/reusable/layout/Typography"
import { Link } from "react-router-dom"

function LogoComponent() {
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <MainBox>
                <MainGirl src={mainGirl} alt={'mainGirl'}/>
            <Stack alignItems={'center'} spacing={2}>
            <TitleStack justifyContent={'center'} alignItems={'center'} spacing={1}>
            <StrokeText variant="h1">
                GAMERS REPUBLIC
            </StrokeText>
            <Typography variant="h4">
                Let's start your adventure in the world of games and entertainment
            </Typography>
            </TitleStack>
            <GridComponent maxWidth={'50%'} gap={3} gridTemplateColumns={'1fr 1fr'} display={'grid'}>
        {
          cardsConfig.map(card => (
            <LabelCard {...card}/>
          ))
        }
      </GridComponent>
            </Stack>
        </MainBox>
        <Link to={"/register"}>
        <StartJourneyButton>
        <Stack justifyContent={'center'} alignItems={'center'}>
        <Button startIcon={<KeyboardArrowRightIcon/>}>
            Start your journey
        </Button>
        </Stack>
        </StartJourneyButton>
        </Link>
        </Stack>
    )
}

const MainBox = styled(Box)({
    position: 'relative',
    height: '100vh',
    width: '90vw',
})

const TitleStack = styled(Stack)({
    position: 'absolute',
    margin: 'auto',
    top: "-60%",
    bottom: 0,
    left: 0,
    right: 0
})

const StartJourneyButton = styled(Paper)({
    position: 'absolute',
    bottom: '10px',
    left: 0,
    right: 0,
    padding: '8px',
})

const GridComponent = styled(Grid)({
    position: 'absolute',
    left: '0',
    bottom: '20%'
})

const MainGirl = styled("img")({
    position: 'absolute',
    height: '100%',
    width: 'auto',
    right: '-10%',
    top: '0'

})

export {
    LogoComponent
}