import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { next, prev, toStep } from "../store/stepSlice";
import { styleComponent } from "../styles";

function StepsContainer({}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    const {stepsDict} = useSelector((state) => state.wizardStep)
    const dispatch = useDispatch()

    function onNextPartClick(part) {
        dispatch(toStep(part))
    }
    return (
        <Box sx={{...styles.steps, ...styles.sideBox}}>
            {
                Object.keys(stepsDict).map((part, idx) => (
                    <Button sx={styles.stepButton}
                        key={part}
                        onClick={() => onNextPartClick(part)}
                        >
                        {part}
                    </Button>
                ))
            }
        </Box>
    )
}

export {
    StepsContainer
}