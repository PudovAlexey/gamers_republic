import { createSlice, current } from "@reduxjs/toolkit";

function toNextStep(stepsDict, currentStep, stepTo) {
  const currentIndex = Object.keys(stepsDict)
  .findIndex(state => state === currentStep)
  return Object.keys(stepsDict)[currentIndex + stepTo] || false
}

const stepSlice = createSlice({
    name: 'stepSlice',
    initialState: {
        currentStep: null,
        position: 'start',
        stepsDict: {},
        wizardResult: {}
    },
    reducers: {
        next: (state) => {
          const {currentStep, stepsDict, position} = state
          if (position === 'end') {
            return
          }
          const nextStep = toNextStep(current(stepsDict), currentStep, +1)
          if (nextStep) {
            state.currentStep = nextStep
            state.position = null
          } else {
            state.position = 'end'
          }
        },
        prev: (state) => {
          const {currentStep, stepsDict, position} = state
          if (position === 'start') {
            return
          }
          const prevStep = toNextStep(current(stepsDict), currentStep, -1)
          if (prevStep) {
            state.currentStep = prevStep
            state.position = null
          } else {
            state.position = 'start'
          }
        },
        toStep: (state, action) => {
            state.currentStep = action.payload
            const stepsMap = Object.keys(state.stepsDict)
            switch(action.payload) {
              case stepsMap[0]: state.position = 'start'
                break;
              case stepsMap[stepsMap.length - 1]: state.position = 'end'
                break;
              default: state.position = null
            }
        },
        wizardInit: (state, action) => {
          state.stepsDict = action.payload
          state.currentStep = Object.keys(action.payload)[0]
        },
        setWizardFieldData: (state, action) => {
          const {field, value} = action.payload
          state.wizardResult = JSON.parse(JSON.stringify({
            ...state.wizardResult,
            [field]: value
          }))
        }
    }
})

export const {
    next,
    prev,
    toStep,
    wizardInit,
    setWizardFieldData
} = stepSlice.actions

export default stepSlice.reducer