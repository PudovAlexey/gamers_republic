import { useTheme } from "@emotion/react"
import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Footer } from "./parts/Footer/Footer"
import { Header } from "./parts/Header/Header"
import { WizardBody } from "./parts/WizardBody"
import { setWizardFieldData, wizardInit } from "./store/stepSlice"
import { styleComponent } from "./styles"

type TControlProps = {
    steps: any
    onComplete: any
    afterStep?: any
}
function Wizard({steps}: TControlProps) {
    const theme = useTheme()
    const styles = styleComponent(theme)
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
    const wizard = stepsDict[currentStep]?.content({
        stepData: wizardResult[currentStep],
        event: onChangeWizardValue,
    })
    return (
        <Box sx={styles.wizard}>
            <WizardBody>{wizard}</WizardBody>
            <Footer/>
        </Box>
    )
}

export default Wizard