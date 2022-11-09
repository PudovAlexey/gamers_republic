import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { next, prev, toStep } from "../store/stepSlice";

function StepsContainer({}) {
    const {currentStep, stepsDict} = useSelector((state) => state.wizardStep)
    const dispatch = useDispatch()

    function onNextPartClick(part) {
        dispatch(toStep(part))
    }
    return (
        <Box>
            <Typography>{currentStep}</Typography>
            {
                Object.keys(stepsDict).map((part, idx) => (
                    <Button
                        key={idx}
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