import { Slider, Box, TextField } from '@mui/material';
import { ChangeEvent } from '../../../types/types';
function RangeSlider({ from, to, onChange }) {
  function onChangeState(value, type) {
    switch (type) {
      case 'from':
        from = value;
        break;
      case 'to':
        to = value;
        break;
      case 'from-to':
        [from, to] = value;
    }
    return onChange(from, to);
  }
  return (
    <Box>
      <Slider
        aria-label="Temperature"
        defaultValue={[from, to]}
        color="secondary"
        onChange={(_, value) => onChangeState(value, 'from-to')}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          label="From"
          value={from}
          onChange={(e: ChangeEvent) => onChangeState(e.target.value, 'from')}
          InputProps={{
            type: 'search',
          }}
        />
        <TextField
          label="To"
          value={to}
          onChange={(e: ChangeEvent) => onChangeState(e.target.value, 'to')}
          InputProps={{
            type: 'search',
          }}
        />
      </Box>
    </Box>
  );
}

export default RangeSlider;
