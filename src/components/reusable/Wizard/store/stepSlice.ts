import { createSlice, current } from '@reduxjs/toolkit';
import { toNextStep } from '../parts/helpers';



function validateValue({ currentStep, field, value, valuesDict = {} }) {
  return currentStep.validationRules?.[field] === undefined
    ? true
    : currentStep.validationRules?.[field].check(value, valuesDict);
}

function checkValidationRules(steps, currentStep) {
  return Object.keys(
    steps[currentStep]?.validationRules || {}
  ).reduce((validationDict, field) => {
    validationDict[field] = validateValue({
      currentStep: steps[currentStep],
      field,
      value: null,
    });
    return validationDict;
  }, {});
}

function checkStepToContinue(step, validationErrors) {
  const errorsMap = Object.values(validationErrors[step] || {});
  return errorsMap.length === 0
    ? false
    : errorsMap.every((field) => field === true);
}

const stepSlice = createSlice({
  name: 'stepSlice',
  initialState: {
    showErrors: false,
    validationErrors: {},
    openSteps: [],
    events: {},
    currentStep: null,
    stepsDict: {},
    wizardResult: {},
  },
  reducers: {
    next: (state) => {
      const { currentStep, stepsDict, validationErrors } = state;
      const steps = current(stepsDict);
      const oldErrors = current(validationErrors)
      const stepsMap = Object.keys(steps);
      if (stepsMap[stepsMap.length - 1] === currentStep) {
        return;
      }
      const nextStep = toNextStep(steps, currentStep, +1);
      if (nextStep) {
        state.currentStep = nextStep;
        if (!oldErrors[nextStep]) {
          state.validationErrors = {
            ...oldErrors,
            [nextStep]: checkValidationRules(current(stepsDict), nextStep)
          }
        }
      }
    },
    prev: (state) => {
      const { currentStep, stepsDict, validationErrors } = state;
      const steps = current(stepsDict);
      const oldErrors = current(validationErrors)
      const stepsMap = Object.keys(steps);
      if (stepsMap[0] === currentStep) {
        return;
      }
      const prevStep = toNextStep(steps, currentStep, -1);
      if (prevStep) {
        state.currentStep = prevStep;

        if (!oldErrors[prevStep]) {
          state.validationErrors = {
            ...oldErrors,
            [prevStep]: checkValidationRules(current(stepsDict), prevStep)
          }
        }
      }
    },
    toStep: (state, action) => {
      const newStep = action.payload
      const {stepsDict, validationErrors} = state
      const oldErrors = current(validationErrors)
      state.currentStep = newStep;
      if (!oldErrors[newStep]) {
        state.validationErrors = {
          ...oldErrors,
          [newStep]: checkValidationRules(current(stepsDict), newStep)
        }
      }
    },
    wizardInit: (state, action) => {
      const steps = action.payload;
      const stepsMap = Object.keys(steps);
      state.stepsDict = steps;
      state.currentStep = stepsMap[0];
      const validationResult = checkValidationRules(steps, stepsMap[0])
      state.validationErrors = {
        [stepsMap[0]]: validationResult,
      };
      state.openSteps = [stepsMap[0]];
    },
    initEvents: (state, action) => {
      state.events = action.payload
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
      state.openSteps = Object.keys(steps).filter((step, idx, steps) => {
        return idx === 0
          ? checkStepToContinue(step, state.validationErrors)
          : checkStepToContinue(steps[idx - 1], state.validationErrors);
      });
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
      state.showErrors = false
      state.validationErrors = {}
    },
  },
});

export const {
  next,
  prev,
  toStep,
  wizardInit,
  setWizardFieldData,
  initEvents,
  showErrors,
  hideErrors,
} = stepSlice.actions;

export default stepSlice.reducer;
