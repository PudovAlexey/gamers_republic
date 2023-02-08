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
        <rect width="35" height="35" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
            //  xlink:href="#image0_6_434"
             transform="scale(0.00869565)" />
          </pattern>
          <image
            id="image0_6_434"
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
