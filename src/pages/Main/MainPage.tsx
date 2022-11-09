import { Box } from '@mui/system';
import Wizard from '../../components/reusable/Wizard/Wizard';

const stepsDict = {
  first: {
    content: <Box>FIRST WIZARD STEP</Box>
  },
  second: {
    content: <Box>SECOND WIZARD STEP</Box>
  },
  third: {
    content: <Box>THIRD WIZARD STEP</Box>
  }
}

function MainPage() {
  return <Wizard stepsDict={stepsDict}/>
}

export default MainPage;
