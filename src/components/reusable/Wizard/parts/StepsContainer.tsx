import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { checkErrors, makeTypeByStep } from './helpers';
import { next, prev, toStep, hideErrors, showErrors } from '../store/stepSlice';
import { dynamicStyleComponent, styleComponent } from '../styles';

function StepsContainer({}) {
  const theme = useTheme();
  const styles = styleComponent(theme);
  const dinamcContent = dynamicStyleComponent(theme);
  const { stepsDict, currentStep, validationErrors } = useSelector((state) => state.wizardStep);
  const dispatch = useDispatch();

  function onNextPartClick(part, buttonType) {
    if (buttonType === 'disabled') {
        dispatch(showErrors())
    } else {
        dispatch(hideErrors())
        dispatch(toStep(part));
    }
  }
  return (
    <Box sx={{ ...styles.steps, ...styles.sideBox }}>
      {Object.keys(stepsDict).map((part) => {
        const buttonType = makeTypeByStep(stepsDict, part, currentStep, validationErrors);
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
    </Box>
  );
}

export { StepsContainer };
