import { IconButton, Paper, styled } from '@mui/material';
import { getEnviroment } from '../..';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { EEnviroment } from '../../types';
import {
  debugComponentSelector,
  toggleDebugSelector,
} from '../store/selectors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { toggleDebug } from '../store';
import { Box } from '@mui/system';

function DebugPanel() {
  const dispatch = useAppDispatch();
  const enviroment = getEnviroment();
  const debugOpen = useAppSelector(toggleDebugSelector);
  const debugComponent = useAppSelector(debugComponentSelector);
  if (enviroment === EEnviroment.Production) return null;
  return (
    <DebugLayout>
      <Debug sx={{ transform: `translateY(${debugOpen ? '-300px' : '0'})` }}>
        <EnviromentButton onClick={() => dispatch(toggleDebug())}>
          <Paper>
            <ArrowUpwardIcon />
          </Paper>
        </EnviromentButton>
        {debugComponent}
      </Debug>
    </DebugLayout>
  );
}
const Debug = styled(Paper)({
  height: '300px',
  width: '50vw',
  transition: 'transform .5s ease-out',
});

const DebugLayout = styled(Box)({
  width: '100vw',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 99999999999999999,
  bottom: '-300px',
  left: 0,
  right: 0,
  margin: '0, auto',
});

const EnviromentButton = styled(IconButton)({
  position: 'relative',
  top: '-25px',
});

export { DebugPanel };
