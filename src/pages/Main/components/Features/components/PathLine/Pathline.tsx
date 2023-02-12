import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { progressFeatureLineSelector } from '../../../../animations/lines/selectors';

function PathLine() {
  const strokeDeshOffset = useAppSelector(progressFeatureLineSelector)
  const strokeDasharray = 2000;
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '1.5px',
        top: '-2px',
        height: '100%',
      }}
    >
      <svg
        width="100vw"
        height="105vh"
        viewBox="0 0 1489 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          strokeDashoffset: strokeDeshOffset + 'px',
          strokeDasharray: strokeDasharray + 'px',
        }}
      >
        <g filter="url(#filter0_d_113_15)">
          <path
            d="M1406.91 86C1421.31 86 1441.64 86 1450 86V384.989L1359.99 419.603H855L572.307 728.123H182.282L35 793.841V842"
            stroke="#D93644"
            stroke-width="10"
            // style={{
            //   strokeDashoffset: strokeDeshOffset + 'px',
            //   strokeDasharray: strokeDasharray + 'px',
            // }}
          />
          <path
            d="M858 2C858 44.8308 858 75.8462 858 86H904"
            stroke="#F8F8F8"
            stroke-width="10"
            // style={{
            //   strokeDashoffset: strokeDeshOffset + 'px',
            //   strokeDasharray: strokeDasharray + 'px',
            // }}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_113_15"
            x="-4"
            y="0"
            width="1495"
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
              result="effect1_dropShadow_113_15"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_113_15"
              result="shape"
            />
          </filter>
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
          }}
        />
      </svg>
    </Box>
  );
}
export { PathLine, PathLineStart };
