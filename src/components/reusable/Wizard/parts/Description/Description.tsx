import { useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { styleComponent } from "../../styles";

function Description() {
    const {currentStep, stepsDict} = useSelector(
        (state => state.wizardStep)
    )
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Paper sx={styles.sideBox}>
            {
                stepsDict[currentStep]?.description || null
            }
        </Paper>
    )
}

export {
    Description
}