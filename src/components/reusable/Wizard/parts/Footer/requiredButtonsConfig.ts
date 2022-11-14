const requiredButtonsConfig = {
  prev: {
    showOn: (steps, step) => !(steps[0] === step),
    disabled: false,
    label: 'Back',
    type: (steps, currentStep) =>
      Object.keys(steps)[Object.keys(steps).indexOf(currentStep) - 1],
    onClick: () => console.log('back'),
  },
  next: {
    variant: 'contained',
    type: (steps, currentStep) =>
      Object.keys(steps)[Object.keys(steps).indexOf(currentStep) + 1],
    showOn: (steps, step) => !(steps[steps.length - 1] === step),
    disabled: false,
    label: 'Next',
    onClick: () => console.log('next'),
  },
  done: {
    type: () => 'done',
    variant: 'contained',
    showOn: (steps, step) => steps[steps.length - 1] === step,
    disabled: false,
    label: 'Done',
    onClick: () => console.log('Done'),
  },
};

export { requiredButtonsConfig };
