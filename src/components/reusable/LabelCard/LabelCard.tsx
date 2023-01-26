import { Box, Paper, Typography } from "@mui/material"
import { Stack, styled } from "@mui/system"
import { Link } from "react-router-dom"
import { BoldTypography, GrayTypography } from "../layout"

export type TCard = {
    title: string,
    link: {
        text: string,
        navTo: string
    },
    description: string,
    icon: JSX.Element
}
function LabelCard({title, link, description, icon}: TCard) {
    return (
        <CardPaper>
            <Stack spacing={2}>
                <GrayTypography variant="h5">{title}</GrayTypography>
                <Link to={link.navTo}>
                    <BoldTypography variant="h6">{link.text}</BoldTypography>
                </Link>
                <Typography>{description}</Typography>
            </Stack>
            <IconWrapper>
                    {icon}
            </IconWrapper>
        </CardPaper>
    )
}

const CardPaper = styled(Paper)({
    position: 'relative',
    padding: '12px 8px',
})

const IconWrapper = styled(Box)({
    top: '15px',
    right: '15px',
    position: 'absolute',
})

export {
    LabelCard
}