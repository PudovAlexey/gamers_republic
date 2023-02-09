import { Box } from '@mui/material';

function PathLine() {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '43.5%',
        top: '8%',
        height: '90%',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 295 409"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5C64.8951 5 89.2308 5 93.2867 5L290 127.303V372.911V409"
          stroke="#0F1923"
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

export { PathLine };
