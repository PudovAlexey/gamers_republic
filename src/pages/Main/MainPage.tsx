import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import Wizard from '../../components/reusable/Wizard/Wizard';

const stepsDict = {
  first: {
    content: (data, event) => {
      const fieldName = 'step1'
      console.log(data)
     return <TextField value={data[fieldName] || ""} onChange={(e) => 
    event(e.target.value, fieldName)} />
    }
  },
  second: {
    content: (data, event) => {
      console.log(data)
      const fieldName = 'step2'
     return <TextField value={data[fieldName] || ""} onChange={(e) => 
    event(e.target.value, fieldName)} />
    }
  },
  third: {
    content: (data, event) => {
      const fieldName = 'step3'
     return <TextField value={data[fieldName] || ""} onChange={(e) => 
    event(e.target.value, fieldName)} />
    }
  },
}

function MainPage() {
  return <Wizard steps={stepsDict}/>
}

export default MainPage;
