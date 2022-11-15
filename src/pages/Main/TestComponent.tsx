import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/typedReduxHooks";

function TestComponent({stepData, event}) {
    const {validationErrors, showErrors, currentStep} = useAppSelector(
        state => state.wizardStep
    )
    const fieldName = 'step1';
    return (
      <FormControl fullWidth>
        <TextField
        value={stepData?.[fieldName] || ''}
        onChange={(e) => event(e.target.value, fieldName)}
      />
      {
        showErrors && validationErrors?.[currentStep]?.[fieldName]?.message  ?
        <FormHelperText>{String(validationErrors?.[currentStep]?.[fieldName]?.message)}</FormHelperText> :
        null
      }
      </FormControl>
    );
  }

  export {
    TestComponent
  }