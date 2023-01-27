import styled from "@emotion/styled"
import { Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { RelatedGamesSlick } from "./components/RelatedGamesSlick/RelatedGamesSlick"
import { popularGamesConfig } from "./popularGamesConfig"

function PopularGames() {
    return (
        <DarkPaper>
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
    width: '100vw',
    height: '100vh',
    background: '#1F2326'
})

const PaperWindow = styled(Paper)({
    padding: "16px"
})

export {
    PopularGames
}