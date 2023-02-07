import { styled, Button } from '@mui/material';
const BorderedButton = styled(Button)({
    fontWeight: 'bold',
  position: 'relative',
  padding: '1rem 3rem',
  width: '270px',
  '&::before': {
    content: '""',
    position: 'absolute',
    borderTop: '1px solid #bdbcb7',
    borderLeft: '1px solid #bdbcb7',
    borderRight: '1px solid #bdbcb7',
    height: '50%',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
  },
  '&::after': {
    content: '""',
    height: '50%',
    position: 'absolute',
    borderBottom: '1px solid #bdbcb7',
    borderLeft: '1px solid #bdbcb7',
    borderRight: '1px solid #bdbcb7',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
  },
});

export { BorderedButton };
