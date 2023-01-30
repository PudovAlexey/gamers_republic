import styled from "@emotion/styled"
import { Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { RelatedGamesSlick } from "./components/RelatedGamesSlick/RelatedGamesSlick"
import { popularGamesConfig } from "./popularGamesConfig"
import girl from './assets/Girl.png'

function PopularGames() {
    return (
        <DarkPaper>
            <DecorationGirl src={girl} alt={'girl'}/>
            <PaperWindow>
                <Stack spacing={3}>
                <Typography variant="h4">{popularGamesConfig.title}</Typography>
                <Typography>{popularGamesConfig.description}</Typography>
                <RelatedGamesSlick/>
                </Stack>
            </PaperWindow>
        </DarkPaper>
    )
}

const DarkPaper = styled(Paper)({
    position: 'relative',
    padding: '0 10%',
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#1F2326'
})

const PaperWindow = styled(Paper)({
    padding: "16px",
    maxWidth: '50%',
    maxHeight: '80%'
})

const DecorationGirl = styled('img')({
    position: 'absolute',
    right: '10%',
    bottom: '0',
    top: '0',
    height: '100%',
    width: 'auto'
})

export {
    PopularGames
}