import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { styleComponent } from "../../styles";

function Description() {
    const {currentStep, stepsDict} = useSelector(
        (state => state.wizardStep)
    )
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.sideBox}>
            {
                stepsDict[currentStep]?.description || null
            }
        </Box>
    )
}

export {
    Description
}