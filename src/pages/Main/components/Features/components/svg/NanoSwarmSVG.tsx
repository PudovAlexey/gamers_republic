import { SvgIcon } from '@mui/material';

type TControlProps = {
  size?: string | number;
  fill?: string;
};

function NanoSwarmSVG({ size, fill, ...props }: TControlProps) {
  return (
    <SvgIcon
      sx={{
        width: 'auto',
        height: size || '40px',
      }}
      {...props}
    >
      <svg
        width="43"
        height="43"
        viewBox="0 0 43 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g filter="url(#filter0_dd_6_431)">
          <rect
            x="4"
            width="35"
            height="35"
            fill="url(#pattern0)"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_dd_6_431"
            x="0"
            y="0"
            width="43"
            height="43"
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
              result="effect1_dropShadow_6_431"
            />
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
              in2="effect1_dropShadow_6_431"
              result="effect2_dropShadow_6_431"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_6_431"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_6_431" transform="scale(0.00869565)" />
          </pattern>
          <image
            id="image0_6_431"
            width="115"
            height="115"
            xlink:href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </SvgIcon>
  );
}

export default NanoSwarmSVG;
