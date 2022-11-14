import React from "react"
import { TField } from "../../../../types/form/types"

type TValidationRules = Record<string, {
    check: (value, wizardResult) => boolean | {
        message: string
    }
}>

type TStepsConfig = Record<string, {
    title?: string
    description: string | React.FC
    validationRules: TValidationRules
    content: ({stepData, event}) => React.FC
}>

type TValidationErrors = Record<string, Record< string, boolean | {
    message: string
}>>

type TWizardResult = Record<string, Record< string, TField<any>>>

type TWizardSlice = {
    showErrors: boolean
    validationErrors: TValidationErrors
    openSteps: string[]
    currentStep: string
    stepsDict: TStepsConfig
    wizardResult: TWizardResult
}

export type {
    TWizardSlice
}