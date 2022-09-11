import { Slider, Box, TextField } from "@mui/material";
function RangeSlider({from, to, onChange}) {
  function onChangeState(value, type) {
    switch(type) {
      case "from": from = value
      break;
      case "to": to = value
      break;
      case "from-to": [from, to] = value
    }
    return onChange(from, to)
  }
    return (
        <Box>
            <Slider
            aria-label="Temperature"
            defaultValue={[from, to]}
            color="secondary"
            onChange={(e) => onChangeState(e.target.value, 'from-to')}
          />
          <Box sx={{
            display: 'flex',
            justifyContent: "space-around"
          }}>
          <TextField
            label="From"
            value={from}
            onChange={(e) => onChangeState(e.target.value, 'from')}
            InputProps={{
              type: 'search',
            }}
          />
          <TextField
            label="To"
            value={to}
            onChange={(e) => onChangeState(e.target.value, 'to')}
            InputProps={{
              type: 'search',
            }}
          />
          </Box>
        </Box>
    )
}

export default RangeSlider