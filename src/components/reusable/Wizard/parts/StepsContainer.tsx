import { useTheme } from '@emotion/react';
import { Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  makeTypeByStep } from './helpers';
import { toStep, hideErrors, showErrors } from '../store/stepSlice';
import { dynamicStyleComponent, styleComponent } from '../styles';
import { useAppSelector } from '../../../../hooks/typedReduxHooks';

function StepsContainer({}) {
  const theme = useTheme();
  const styles = styleComponent(theme);
  const dinamcContent = dynamicStyleComponent(theme);
  const { stepsDict, currentStep, openSteps, events, wizardResult } = useAppSelector((state) => state.wizardStep);
  const dispatch = useDispatch();

  function onNextPartClick(part, buttonType) {
    if (buttonType === 'disabled') {
        dispatch(showErrors())
    } else {
      const {onMoveToStep} = events
        dispatch(hideErrors())
        dispatch(toStep(part));
        onMoveToStep(wizardResult, part)
    }
  }
  return (
    <Paper sx={{ ...styles.steps, ...styles.sideBox }}>
      {Object.keys(stepsDict).map((part) => {
        const buttonType = makeTypeByStep(part, currentStep, openSteps);
        return (
          <Button
            sx={{
              ...styles.stepButton,
              ...dinamcContent.stepButtonType(buttonType),
            }}
            key={part}
            onClick={() => onNextPartClick(part, buttonType)}
          >
            {part.toUpperCase()}
          </Button>
        );
      })}
    </Paper>
  );
}

export { StepsContainer };
