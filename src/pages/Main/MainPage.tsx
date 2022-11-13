import { FormControl, FormHelperText, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Wizard from '../../components/reusable/Wizard/Wizard';
import { TestComponent } from './TestComponent';

const stepsDict = {
  first: {
    title: 'FirstStep',
    description:
      'description1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    validationRules: {
      step1: {
        check: (value) => !!value || {
          message: 'notNull'
        },
      },
    },
    content: (props) => 
    <TestComponent {...props}/>,
  },
  second: {
    description: "description2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    step2: {
      check: (_, value) => !!value,
      message: 'notNull',
    },
    content: ({stepData, event}) => {
      const fieldName = 'step2';
      return (
        <TextField
          value={stepData?.[fieldName] || ''}
          onChange={(e) => event(e.target.value, fieldName)}
        />
      );
    },
  },
  third: {
    description: "description3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    validationRules: {
      step3: {
        check: (_, value) => !!value,
        message: 'notNull',
      },
    },
    content: ({stepData, event}) => {
      const fieldName = 'step3';
      return (
        <TextField
          value={stepData?.[fieldName] || ''}
          onChange={(e) => event(e.target.value, fieldName)}
        />
      );
    },
  },
};

function MainPage() {
  return (
    <Box
      sx={{
        height: '88vh',
        marginBottom: '15px',
      }}
    >
      <Wizard steps={stepsDict} />
    </Box>
  );
}

export default MainPage;
