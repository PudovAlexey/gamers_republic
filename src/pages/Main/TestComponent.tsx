import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useSelector } from "react-redux";

function TestComponent({stepData, event}) {
    const {validationErrors, showErrors, currentStep} = useSelector(
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
        <FormHelperText>{validationErrors?.[currentStep]?.[fieldName]?.message}</FormHelperText> :
        null
      }
      </FormControl>
    );
  }

  export {
    TestComponent
  }