import { createSlice } from "@reduxjs/toolkit";

function toNextStep(stepsDict, currentStep, stepTo) {
  const currentIndex = Object.keys(stepsDict)
  .findIndex(state => state === currentStep)
  return stepsDict[currentIndex + stepTo] || currentIndex
}

const stepSlice = createSlice({
    name: 'stepSlice',
    initialState: {
        currentStep: null,
        position: 'start',
        stepsDict: {}
    },
    reducers: {
        next: (state) => {
          const {currentStep, stepsDict, position} = state
          if (position === 'end') {
            return
          }
          const nextStep = toNextStep(stepsDict, currentStep, +1)
          nextStep ? state.currentStep = nextStep : state.position = 'end'
        },
        prev: (state) => {
          const {currentStep, stepsDict, position} = state
          if (position === 'start') {
            return
          }
          const prevStep = toNextStep(stepsDict, currentStep, -1)
          prevStep ? state.currentStep = prevStep : state.position = 'start'
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
        }
    }
})

export const {
    next,
    prev,
    toStep,
    wizardInit
} = stepSlice.actions

export default stepSlice.reducer