import { useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import { useAppSelector } from "../../../../../hooks/typedReduxHooks";
import { styleComponent } from "../../styles";

function Description() {
    const {currentStep, stepsDict} = useAppSelector((state) => state.wizardStep)
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