import { Box } from "@mui/material"
import { Footer } from "./parts/Footer"
import { Header } from "./parts/Header"
import { WizardBody } from "./parts/WizardBody"
function Wizard({stepsDict}) {
    return (
        <Box>
            <Header/>
            <WizardBody>{stepsDict.content}</WizardBody>
            <Footer
             actions={[]}
            />
        </Box>
    )
}

export default Wizard