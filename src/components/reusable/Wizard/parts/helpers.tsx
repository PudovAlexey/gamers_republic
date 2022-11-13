function makeTypeByStep(steps, part, currentStep, validationErrors) {
  console.log(validationErrors?.[currentStep]);
  let stepClass = null;
  if (currentStep === part) {
    stepClass = 'active';
  } else if (
    !Object.keys(validationErrors?.[currentStep] || {}).every(
      (field) => validationErrors[currentStep][field] === true
    )
  ) {
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
