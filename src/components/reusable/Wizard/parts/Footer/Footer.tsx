import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { requiredButtonsConfig } from './requiredButtonsConfig';
import { next, prev, showErrors } from '../../store/stepSlice';
import { dynamicStyleComponent, styleComponent } from '../../styles';
import { useTheme } from '@emotion/react';
import { makeTypeByStep, toNextStep } from '../helpers';
const dispatchMethods = {
  next,
  prev,
};

function Footer() {
  let actions = {};
  const theme = useTheme();
  const dynamicStyles = dynamicStyleComponent(theme);
  const styles = styleComponent(theme);
  const dispatch = useDispatch();
  const {
    currentStep,
    stepsDict,
    wizardResult,
    openSteps,
    events,
    validationErrors,
  } = useSelector((state) => state.wizardStep);
  actions = { ...actions, ...requiredButtonsConfig, wizardResult };
  return (
    <BottomNavigation
      sx={styles.footerButtons}
      showLabels
      onChange={(event) => {
        const { id, dataset } = event.currentTarget;
        const { onComplete, onMoveBack, onMoveFront } = events;
        if (dataset?.buttontype === 'disabled') {
          dispatch(showErrors());
          return;
        } else if (typeof dispatchMethods[id] === 'function') {
          dispatch(dispatchMethods[id]());
        }
        typeof actions[id]?.onClick === 'function' &&
          actions[id].onClick(wizardResult);

        switch (id) {
          case 'done': onComplete(wizardResult);
            break;
          case 'prev':
            onMoveBack(wizardResult, toNextStep(stepsDict, currentStep, -1));
            break;
          case 'next':
            onMoveFront(wizardResult, toNextStep(stepsDict, currentStep, 1));
            break;
        }
      }}
    >
      {Object.keys(actions)
        .filter(
          (action) =>
            typeof actions[action].showOn === 'function' &&
            actions[action].showOn(Object.keys(stepsDict), currentStep)
        )
        .map((action) => {
          const buttonType =
            typeof actions[action].type === 'function'
              ? makeTypeByStep(
                  actions[action].type(stepsDict, currentStep),
                  currentStep,
                  openSteps,
                  validationErrors
                )
              : actions[action]?.type || 'default';
          return (
            <BottomNavigationAction
              sx={{
                ...styles.footerButton,
                ...dynamicStyles.stepButtonType(buttonType),
                ...dynamicStyles.footerButtons(
                  actions[action]?.variant || 'text'
                ),
              }}
              id={action}
              data-buttonType={buttonType}
              label={actions[action].label}
            />
          );
        })}
    </BottomNavigation>
  );
}

export { Footer };
