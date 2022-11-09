import { createSlice } from "@reduxjs/toolkit";

const stepsDict = {
    first: {
      content: "Test"
    },
    second: {
      content: "Test"
    },
    third: {
      content: "Test"
    }
  }

const stepSlice = createSlice({
    name: 'stepSlice',
    initialState: {
        currentStep: 'first',
        stepsDict: stepsDict
    },
    reducers: {
        next: (state) => {
            state.currentStep = "third"
        },
        prev: (state, value) => {
            state.currentStep = "second"
        },
        toStep: (state, action) => {

            state.currentStep = action.payload

        }
    }
})

export const {
    next,
    prev,
    toStep
} = stepSlice.actions

export default stepSlice.reducer