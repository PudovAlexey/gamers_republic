import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/typedReduxHooks';
import { WizardBody } from './parts/WizardBody';
import { setWizardFieldData, wizardInit, initEvents } from './store/stepSlice';
import { styleComponent } from './styles';

type TControlProps = {
  steps: any;
  onComplete?: (wizardResult) => void
  onMoveBack?: (wizardResult, step) => void
  onMoveFront?: (wizardResult, step) => void 
  onMoveToStep?: (wizardResult, step) => void 
};
function Wizard({ 
    steps, 
    onComplete = () =>{}, 
    onMoveBack = () =>{},
    onMoveFront = () =>{},
    onMoveToStep = () =>{}
 }: TControlProps) {
  const theme = useTheme();
  const styles = styleComponent(theme);
  const { currentStep, stepsDict, wizardResult } = useAppSelector(
    (state) => state.wizardStep
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wizardInit(steps));
    dispatch(
      initEvents({
        onComplete,
        onMoveBack,
        onMoveFront,
        onMoveToStep,
      })
    );
  }, []);

  function onChangeWizardValue(value, field) {
    return dispatch(
      setWizardFieldData({
        field,
        value,
      })
    );
  }
  const wizard = stepsDict[currentStep]?.content({
    stepData: wizardResult[currentStep],
    event: onChangeWizardValue,
  });
  return (
    <Box sx={styles.wizard}>
      <WizardBody>{wizard}</WizardBody>
    </Box>
  );
}

export default Wizard;
