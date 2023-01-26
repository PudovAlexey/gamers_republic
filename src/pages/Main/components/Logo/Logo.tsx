import { Grid, styled, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { LabelCard } from "../../../../components/reusable/LabelCard/LabelCard"
import { cardsConfig } from "./cardsConfig"
import mainGirl from '../svg/Jett.png'

function LogoComponent() {
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <MainBox>
                <MainGirl src={mainGirl} alt={'mainGirl'}/>
            <Stack alignItems={'center'} spacing={2}>
            <Typography variant="h1">
                GAMERS REPUBLIC
            </Typography>
            <Typography variant="h5">
                Let's start your adventure in the world of games and entertainment
            </Typography>
            <Grid maxWidth={'50%'} gap={1} gridTemplateColumns={'1fr 1fr'} display={'grid'}>
        {
          cardsConfig.map(card => (
            <LabelCard {...card}/>
          ))
        }
      </Grid>
            </Stack>
        </MainBox>
        </Stack>
    )
}

const MainBox = styled(Box)({
    position: 'relative',
    height: '100vh'
})

const MainGirl = styled("img")({
    position: 'absolute',
    height: '100%',
    width: 'auto',
    right: '0',

})

export {
    LogoComponent
}