import TextField from '@mui/material/TextField';

function SearchField({ value, onChange }) {
  return (
    <TextField
      label="Search input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        type: 'search',
      }}
    />
  );
}

export default SearchField;
