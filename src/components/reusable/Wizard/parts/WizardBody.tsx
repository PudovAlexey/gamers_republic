import { useTheme } from "@emotion/react";
import { Description } from "./Description/Description";
import { Box } from "@mui/system";
import { styleComponent } from "../styles";
import { StepsContainer } from "./StepsContainer";
import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { camelCaseToText } from "../../../../utils/formatters/formatters";
import { Footer } from "./Footer/Footer";

function WizardBody({children}) {
    const {currentStep, stepsDict} = useSelector(
        (state) => state.wizardStep
    )
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.layout}>
            <StepsContainer/>
           <Paper sx={styles.bodyBox}>
            <Typography variant="h4">{stepsDict[currentStep]?.title || camelCaseToText(currentStep || "")}</Typography>
            {children}
            <Footer/>
           </Paper>
            <Description/>
        </Box>
    )
}

export {
    WizardBody
}