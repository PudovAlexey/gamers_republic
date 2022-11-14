import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requiredButtonsConfig } from './requiredButtonsConfig';
import { next, prev, toStep, showErrors } from '../../store/stepSlice';
import { dynamicStyleComponent, styleComponent } from '../../styles';
import { useTheme } from '@emotion/react';
import { makeTypeByStep } from '../helpers';
const dispatchMethods = {
  next,
  prev,
};

type TControlAction = {
  disabled: boolean;
  label: string;
  onClick: (e) => void;
};

function Footer() {
  let actions = {};
  const theme = useTheme();
  const dynamicStyles = dynamicStyleComponent(theme);
  const styles = styleComponent(theme);
  const dispatch = useDispatch();
  const { currentStep, stepsDict, wizardResult, validationErrors, openSteps } =
    useSelector((state) => state.wizardStep);
  actions = { ...actions, ...requiredButtonsConfig, wizardResult };
  return (
    <BottomNavigation
      sx={styles.footerButtons}
      showLabels
      onChange={(event) => {
        const { id, dataset } = event.currentTarget;
        if (dataset?.buttontype === 'disabled') {
            dispatch(showErrors())
        } else if (typeof dispatchMethods[id] === 'function') {
          dispatch(dispatchMethods[id]());
        }
        typeof actions[id]?.onClick === 'function' &&
          actions[id].onClick(wizardResult);
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
            typeof actions[action].navTo === 'function'
              ? makeTypeByStep(
                  actions[action].navTo(stepsDict, currentStep),
                  currentStep,
                  openSteps
                )
              : actions[action]?.type || 'default';
          return (
            <BottomNavigationAction
              sx={{
                ...styles.footerButton,
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
