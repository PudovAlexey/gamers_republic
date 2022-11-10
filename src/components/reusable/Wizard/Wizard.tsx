import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Footer } from "./parts/Footer/Footer"
import { Header } from "./parts/Header/Header"
import { WizardBody } from "./parts/WizardBody"
import { setWizardFieldData, wizardInit } from "./store/stepSlice"

type TControlProps = {
    steps: any
    onComplete: any
    afterStep?: any
}
function Wizard({steps}: TControlProps) {
    const {currentStep, stepsDict, wizardResult} = useSelector((state) => state.wizardStep)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wizardInit(steps))
    }, [])

    function onChangeWizardValue(value, field) {
        return dispatch(setWizardFieldData({
            field,
            value
        }))
    }
    const wizard = stepsDict[currentStep]?.content(wizardResult, onChangeWizardValue)
    return (
        <Box>
            <Header/>
            <WizardBody>{wizard}</WizardBody>
            <Footer
             actions={{}}
            />
        </Box>
    )
}

export default Wizard