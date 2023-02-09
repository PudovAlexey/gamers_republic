import { Box } from '@mui/material';

function PathLine() {
  const strokeDeshOffset = 0;
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '10%',
        top: '10%',
        height: '90%',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1307 759"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1262.5 5C1275.7 5 1294.33 5 1302 5V303L1219.5 337.5H674L497.5 645H140L5 710.5V758.5"
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
        right: '31.7%',
        top: '0',
        height: '6.5%',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 10 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 0C5 40.4992 5 54.208 5 56"
          stroke="#F8F8F8"
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
