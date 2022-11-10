import { useTheme } from "@emotion/react";
import { Description } from "./Description/Description";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { styleComponent } from "../styles";
import { Footer } from "./Footer/Footer";
import { StepsContainer } from "./StepsContainer";

function WizardBody({children}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.layout}>
            <StepsContainer/>
           <Box sx={styles.bodyBox}>
            {children}
           <Footer/>
           </Box>
            <Description/>
        </Box>
    )
}

export {
    WizardBody
}