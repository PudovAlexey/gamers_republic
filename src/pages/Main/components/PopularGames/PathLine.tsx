import { Box } from '@mui/material';

function PathLine() {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50px',
        top: '10%',
        height: '90%',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 970 758"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38 5C18 5 7.66667 5 5 5V510L160 689H905L965 737V758"
          stroke="#f8f8f8"
          stroke-width="10"
          style={{
            strokeDashoffset: strokeDeshOffset + 'px',
            strokeDasharray: strokeDasharray + 'px',
          }}
        />
      </svg>
    </Box>
  );
}

function PathLineStart() {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '22%',
        right: '0',
        top: '0%',
        height: '90%',
      }}
    >
      <svg
        width="336"
        height="93"
        viewBox="0 0 336 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M331 0C331 28 331 45.3333 331 50.5L136.078 88H0"
          stroke="#D93644"
          stroke-width="10"
          style={{
            strokeDashoffset: strokeDeshOffset + 'px',
            strokeDasharray: strokeDasharray + 'px',
          }}
        />
      </svg>
    </Box>
  );
}

export { PathLine, PathLineStart };
