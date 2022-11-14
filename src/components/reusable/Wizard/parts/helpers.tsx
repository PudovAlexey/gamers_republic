function makeTypeByStep(part, currentStep, openSteps, validationErrors = {}) {
  let stepClass = null;
  const checkErrors = Object.values(validationErrors).every((fields) =>
  Object.values(fields).every((i) => i === true)
)
  if (
    checkErrors &&
    part === 'done'
  ) {
    stepClass = 'default';
  } else if (!checkErrors &&
    part === 'done') {
      stepClass = 'disabled';
  } else if (currentStep === part) {
    stepClass = 'active';
  } else if (!openSteps.some((step) => part === step)) {
    stepClass = 'disabled';
  } else {
    stepClass = 'default';
  }

  return stepClass;
}

function checkErrors(stepErrors) {
  return !Object.keys(stepErrors).every(
    (fieldId) => stepErrors[fieldId] === true
  );
}

function toNextStep(stepsDict, currentStep, stepTo) {
  const currentIndex = findStepIndex(stepsDict, currentStep);
  return Object.keys(stepsDict)[currentIndex + stepTo] || false;
}

function findStepIndex(stepsDict, currentStep) {
  return Object.keys(stepsDict).findIndex((state) => state === currentStep);
}

export { makeTypeByStep, checkErrors, toNextStep };
