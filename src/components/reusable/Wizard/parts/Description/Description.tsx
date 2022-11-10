import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import { styleComponent } from "../../styles";

function Description({children}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.sideBox}>
            HERE IS DESCRIption
            </Box>
    )
}

export {
    Description
}