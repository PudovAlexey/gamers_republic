import { Box, Paper } from "@mui/material"
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
            <ContentWrapper>
            <Stack spacing={2}>
                <GrayTypography variant="h5">{title}</GrayTypography>
                <Link to={link.navTo}>
                    <BoldTypography variant="h6">{link.text}</BoldTypography>
                </Link>
                <GrayTypography>{description}</GrayTypography>
            </Stack>
            <IconWrapper>
                    {icon}
            </IconWrapper>
            </ContentWrapper>
        </CardPaper>
    )
}

const CardPaper = styled(Paper)({
    border: '2px solid #1F2326',
    position: 'relative',
    padding: '12px 8px',
    "&::after": {
        content: "''",
        position: 'absolute',
        right: '10%',
        bottom: '0',
        width: '30%',
        height: '60%',
        zIndex: 1,
        background: '#d93644'
    }
})

const ContentWrapper = styled(Box)({
    maxWidth: '60%'
})

const IconWrapper = styled(Box)({
    zIndex: 2,
    top: '15px',
    maxWidth: '30%',
    right: '15px',
    position: 'absolute',
})

export {
    LabelCard
}