import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Footer } from "./parts/Footer/Footer"
import { Header } from "./parts/Header/Header"
import { WizardBody } from "./parts/WizardBody"
import { wizardInit } from "./store/stepSlice"

type TControlProps = {
    steps: any
    onComplete: any
    afterStep?: any
}
function Wizard({steps}: TControlProps) {
    const {currentStep, stepsDict} = useSelector((state) => state.wizardStep)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wizardInit(steps))
    }, [])
    return (
        <Box>
            <Header/>
            <WizardBody>{stepsDict[currentStep]?.content}</WizardBody>
            <Footer
             actions={{}}
            />
        </Box>
    )
}

export default Wizard