import { Box } from '@mui/material';

function PathLine() {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '15%',
        top: '10px',
        height: '90%',
      }}
    >
      <svg
        width="847"
        height="356"
        viewBox="0 0 847 356"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M841.5 0C841.5 59.2504 841.5 31.1652 841.5 45.5M672.066 84.5021C447.462 84.5021 528.104 84.5021 520.5 84.5021L217 350.002H0.65094"
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
