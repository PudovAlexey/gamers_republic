import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { styleComponent } from "../styles";
import { StepsContainer } from "./StepsContainer";

function WizardBody({children}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.layout}>
           <StepsContainer/>
           {children}
        </Box>
    )
}

export {
    WizardBody
}