import { TextField } from '@mui/material';

function Timer({ onChange, ...props }) {
  function onChangeValue(e) {
    console.log(e);
    const value = e.target.value;
    let parsedValue = value.split('').reduce((value, key, idx) => {
      if (idx > 4) {
        value = false;
      } else {
        value = idx === 2 && key !== ':' ? value + ':' + key : value + key;
      }
      return value;
    }, '');
    onChange(typeof parsedValue === 'string' ? parsedValue : props.value);
  }
  return (
    <TextField
      label="set timer"
      variant="filled"
      {...props}
      onChange={(e) => onChangeValue(e)}
    />
  );
}

export default Timer;
