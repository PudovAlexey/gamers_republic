function makeTypeByStep(part, currentStep, openSteps) {
  let stepClass = null;
  if (currentStep === part) {
    stepClass = 'active';
  } else if (!openSteps.some(step => part === step)) {
    stepClass = 'disabled';
  } else {
    stepClass = 'default';
  }

  return stepClass;
}

function checkErrors(stepErrors) {
  return !Object.keys(stepErrors).every(fieldId => stepErrors[fieldId] === true)
}

export { makeTypeByStep, checkErrors };
