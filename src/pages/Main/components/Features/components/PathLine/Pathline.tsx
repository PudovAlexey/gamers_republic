import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { progressFeatureLineSelector } from '../../../../animations/lines/selectors';

function PathLine() {
  const strokeDeshOffset = useAppSelector(progressFeatureLineSelector);
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
        preserveAspectRatio="none"
        width="100%"
        height="105%"
        viewBox="0 0 1490 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          strokeDashoffset: strokeDeshOffset + 'px',
          strokeDasharray: strokeDasharray + 'px',
          strokeLinecap: "round" 
        }}
      >
        <g clip-path="url(#clip0_113_15)" filter="url(#filter0_d_113_15)">
          <path
            d="M1409.82 86.3036C1424.25 86.3036 1444.62 86.3036 1453 86.3036V387.545L1362.8 422.42H856.739L573.446 733.265H182.594L35 799.478V848"
            stroke="#D93644"
            stroke-width="10"
          />
          <path
            d="M861 -88C861 0.875665 861 65.2339 861 86.3036H910"
            stroke="#F8F8F8"
            stroke-width="10"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_113_15"
            x="-4"
            y="0"
            width="1498"
            height="847"
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
              result="effect1_dropShadow_113_15"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_113_15"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_113_15">
            <rect width="1490" height="839" fill="white" />
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
            strokeLinecap: 'round',
            transition: 'all .5s ease-out'
          }}
        />
      </svg>
    </Box>
  );
}
export { PathLine, PathLineStart };
