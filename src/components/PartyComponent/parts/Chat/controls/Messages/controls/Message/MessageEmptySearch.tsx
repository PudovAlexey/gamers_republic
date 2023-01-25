import { styled, Typography } from "@mui/material"

function MessageEmptySearch() {
    return (
        <NoResultsTypography variant="h6">There are no match results for whese creteria...</NoResultsTypography>
    )
}

const NoResultsTypography = styled(Typography)({
    color: "#F8F8F8 !important",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: "100%"

})

export {
    MessageEmptySearch
}