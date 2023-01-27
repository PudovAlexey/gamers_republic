import { Stack, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { IconButtonRounded } from '../layout';
import { useState } from 'react';

type TControlProps = {
  value: string,
  onChange: (value: string) => void,
  folding?: boolean
}

function SearchField({ value, onChange, folding = false }: TControlProps) {
  const [width, setWidth] = useState<string | number>(folding ?  0 : "100%")

  function handleMouseOver() {
    setWidth('100%')
  }
  function handleMouseLeave() {
   if (folding) {
    setWidth(pr => pr === 0 ? "100%" : 0)
   }
  }
  return (
    <SearchWrapper onMouseLeave={handleMouseLeave}  direction={'row'}>
      <SearchFieldInput
      sx={{width}}
      label="Search input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        type: 'search',
      }}
    />
      <IconRoundedSearch onMouseOver={handleMouseOver}>
        <SearchIcon fontSize='small'/>
      </IconRoundedSearch>
    </SearchWrapper>
  );
}

const SearchFieldInput = styled(TextField)({
  position: 'relative',
  left: '14px',
  transition: 'width .5s ease'

})

const IconRoundedSearch = styled(IconButtonRounded)(({theme}) => ({
  background: "#d93644",
  width: '50px !important',
  height: '50px !important',
  "&:hover": {
    background: "#d93644",
  }
}))

const SearchWrapper = styled(Stack)({
  display: 'flex',
  justifyContent: 'right'
})

export default SearchField;
