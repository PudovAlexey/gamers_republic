import { createSlice, current } from '@reduxjs/toolkit';

function toNextStep(stepsDict, currentStep, stepTo) {
  const currentIndex = findStepIndex(stepsDict, currentStep);
  return Object.keys(stepsDict)[currentIndex + stepTo] || false;
}

function findStepIndex(stepsDict, currentStep) {
  return Object.keys(stepsDict).findIndex((state) => state === currentStep);
}

function validateValue({ currentStep, field, value, valuesDict = {} }) {
  return currentStep.validationRules?.[field] === undefined
    ? true
    : currentStep.validationRules?.[field].check(value, valuesDict);
}

const stepSlice = createSlice({
  name: 'stepSlice',
  initialState: {
    showErrors: false,
    validationErrors: {},
    currentStep: null,
    stepsDict: {},
    wizardResult: {},
  },
  reducers: {
    next: (state) => {
      const { currentStep, stepsDict } = state;
      const steps = current(stepsDict);
      const stepsMap = Object.keys(steps);
      if (stepsMap[stepsMap.length - 1] === currentStep) {
        return;
      }
      const nextStep = toNextStep(steps, currentStep, +1);
      if (nextStep) {
        state.currentStep = nextStep;
      }
    },
    prev: (state) => {
      const { currentStep, stepsDict } = state;
      const steps = current(stepsDict);
      const stepsMap = Object.keys(steps);
      if (stepsMap[0] === currentStep) {
        return;
      }
      const prevStep = toNextStep(steps, currentStep, -1);
      if (prevStep) {
        state.currentStep = prevStep;
      }
    },
    toStep: (state, action) => {
      state.currentStep = action.payload;
    },
    wizardInit: (state, action) => {
      const stepsDict = action.payload;
      const stepsMap = Object.keys(stepsDict);
      state.stepsDict = stepsDict;
      state.currentStep = stepsMap[0];
      const validationResult = Object.keys(
        stepsDict[stepsMap[0]]?.validationRules || {}
      ).reduce((validationDict, field) => {
        validationDict[field] = validateValue({
          currentStep: stepsDict[stepsMap[0]],
          field,
          value: null,
        });
        return validationDict;
      }, {});
      state.validationErrors = {
        [stepsMap[0]]: validationResult,
      };
    },
    setWizardFieldData: (state, action) => {
      const { stepsDict, currentStep, validationErrors, wizardResult } = state;
      const oldResult = current(wizardResult);
      const steps = current(stepsDict);
      const oldErrors = current(validationErrors);
      const { field, value } = action.payload;
      const validationResult = validateValue({
        currentStep: steps[currentStep],
        field,
        value,
        valuesDict: oldResult,
      });
      state.validationErrors = {
        ...oldErrors,
        [currentStep]: {
          ...oldErrors[currentStep],
          [field]: validationResult,
        },
      };
      state.wizardResult = {
        ...oldResult,
        [currentStep]: {
          ...oldResult[currentStep],
          [field]: value,
        },
      };
      // state.wizardResult = JSON.parse(
      //   JSON.stringify({
      //     ...state.wizardResult,
      //     [field]: value,
      //   })
      // );
    },
    showErrors: (state) => {
      state.showErrors = true;
    },
    hideErrors: (state) => {
      state.showErrors = false;
    },
    wizardLeave: (state) => {
      state.currentStep = null;
      state.stepsDict = {};
      state.wizardResult = {};
    },
  },
});

export const { next, prev, toStep, wizardInit, setWizardFieldData, showErrors, hideErrors } =
  stepSlice.actions;

export default stepSlice.reducer;
