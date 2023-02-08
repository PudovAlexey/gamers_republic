import { SvgIcon } from '@mui/material';

type TControlProps = {
  size?: string | number;
  fill?: string;
};

function LockdownSVG({ size, fill, ...props }: TControlProps) {
  return (
    <SvgIcon
      sx={{
        width: 'auto',
        height: size || '40px',
      }}
      {...props}
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="35" height="35" fill="url(#pattern0)" 
        />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use 
            // xlink:href="#image0_6_437" 
            transform="scale(0.00869565)" />
          </pattern>
          <image
            id="image0_6_437"
            width="115"
            height="115"
            // xlink:href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </SvgIcon>
  );
}

export default LockdownSVG;
