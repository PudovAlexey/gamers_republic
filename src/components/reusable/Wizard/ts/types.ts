import React from "react"
import { TField } from "../../../../types/form/types"

type TValidationRules = Record<string, {
    check: (value, wizardResult) => boolean | {
        message: string
    }
}>

type TStepsConfig = Record<string, {
    title?: string
    description: string | React.ReactNode
    validationRules: TValidationRules
    content: ({stepData, event}) => React.ReactNode
}>

type TValidationErrors = Record<string, Record< string, Record<string, boolean | {
    message: string
}>>>

type TWizardResult = Record<string, Record< string, TField<any>>>

type TWizardSlice = {
    events: {
        onComplete: (wizardResult: TWizardResult) => void
        onMoveBack: (wizardResult: TWizardResult, step: string) => void
        onMoveFront: (wizardResult: TWizardResult, step: string) => void
        onMoveToStep: (wizardResult: TWizardResult, step: string) => void
    }
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