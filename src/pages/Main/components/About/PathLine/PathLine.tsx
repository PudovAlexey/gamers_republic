import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../hooks/typedReduxHooks';
import { progressAboutSelector } from '../../../animations/lines/selectors';

function PathLine() {
  const strokeDeshOffset = useAppSelector(progressAboutSelector);
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '3px',
        // right: '0.7%',
        // top: '10px',
        height: '100%',
      }}
    >
      <svg
        width="100vw"
        height="105vh"
        viewBox="0 0 100vw 105vh"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_115_16)" filter="url(#filter0_d_115_16)">
          <path
            d="M1438 -5C1438 54.7176 1438 82.549 1438 89H1413"
            stroke="#0f1923"
            stroke-width="10"
            style={{
              strokeDashoffset: strokeDeshOffset + 'px',
              strokeDasharray: strokeDasharray + 'px',
            }}
          />
          <path
            d="M1102 90C945.182 90 898.271 90 894.417 90L633.557 357H431"
            stroke="#D93644"
            stroke-width="10"
            style={{
              strokeDashoffset: strokeDeshOffset + 'px',
              strokeDasharray: strokeDasharray + 'px',
            }}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_115_16"
            x="-4"
            y="0"
            width="1495"
            height="846"
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
              result="effect1_dropShadow_115_16"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_115_16"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_115_16">
            <rect width="1487" height="838" fill="white" />
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
