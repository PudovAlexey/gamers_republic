import { Box } from '@mui/material';
import { useAppSelector } from '../../../../hooks/typedReduxHooks';
import { progressGameLineSelector } from '../../animations/lines/selectors';

function PathLine() {
  const strokeDeshOffset = useAppSelector(progressGameLineSelector)
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0vw',
        top: '0%',
        height: '100%',
      }}
    >
      <svg
        width="100vw"
        height="105vh"
        viewBox="0 0 100vw 105vh"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          strokeDashoffset: strokeDeshOffset + 'px',
          strokeDasharray: strokeDasharray + 'px',
        }}
      >
        <g clip-path="url(#clip0_110_4)" filter="url(#filter0_d_110_4)">
          <path
            d="M60.083 86C44.7469 86 26.971 86 20 86V567.31L179.461 754.714H860V852"
            stroke="#F8F8F8"
            stroke-width="10"
            // style={{
            //   strokeDashoffset: strokeDeshOffset + 'px',
            //   strokeDasharray: strokeDasharray + 'px',
            // }}
          />
          <path
            d="M724 1C724 54.2174 724 79.8406 724 86H424"
            stroke="#D93644"
            stroke-width="10"
            // style={{
            //   strokeDashoffset: strokeDeshOffset + 'px',
            //   strokeDasharray: strokeDasharray + 'px',
            // }}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_110_4"
            x="-4"
            y="0"
            width="1497"
            height="850"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_110_4"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_110_4"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_110_4">
            <rect width="1489" height="842" fill="white" />
          </clipPath>
        </defs>
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
