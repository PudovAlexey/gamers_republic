import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { StepsContainer } from "./StepsContainer";

function WizardBody({children}) {
    return (
        <Box>
           <StepsContainer/>
           {children}
        </Box>
    )
}

export {
    WizardBody
}