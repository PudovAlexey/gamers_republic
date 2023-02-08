import { SvgIcon } from '@mui/material';

type TControlProps = {
  size?: string | number;
  fill?: string;
};

function TurretSVG({ size, fill, ...props }: TControlProps) {
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
            // xlink:href="#image0_6_428"
             transform="scale(0.00869565)" />
          </pattern>
          <image
            id="image0_6_428"
            width="115"
            height="115"
            // xlink:href="data:image/png;base64,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hMTent721BIH+nobNJ9sO84vNKQd2Za9NrcUcbCPWO08z89ssBbxa1Zal+ZX75rmSKKMZQf6TRe40kuyu/Cnxw5G0wswmmmMIwBqeYvZ/IX32ZpqmhBKOZziNP0QUMk/qE/7lYuAckZxEqcxigKgkruYRuUufGdFDDzJt5MmX8x1vuSdfn7nppfx/fYcf+GrfpJ0jtZ5X+uArNySLPCCjOfhKq9uz7nUTgeO8YkMKkWTczx4l2xYYpnXJxkvWqPO2Y7dkUuTWOokP0jRhaJ40y/kmKiI/bw74f3MjOVOtruBedv1G+UjWUT6Lfec7V0Y27GiBRjJnZyc5t33VNQwj4+3owXpwpGMyCr/Jn7Er6jOyedxxKPbPAF3Jbb50x3fAdomeWySD6Sz0eA9mT41sDMkR4TvQu8+qPeHHWoEE0u8v80mYza1uT/uKGJtGlk2eWp2NLN96fg4zmwz/UNuDeNZOxJNzOI3GYPnoCdX0LODxlMs8rdt9vliTxRP898dOpKN/sa97eXDbYzoNsd3HM1RbdoA3okf2B1MtNGH7RP6q59oY0Hc20F3F/FrGcLTVBf4+YgDqKOINvqbSETDkDaCat5qP0ArO5J4e8ZGXo9+S8R4MNUSt1hhhVVZv57RjForwt9D8ZFM1DrClzKU2eDo9mlmExKaR98MKfOZzFstik6A8AyL6YFAKVfzpe3QszYxlVcICIjxIZuTal3CFdzL2DSlium384MZjxB6LG0/vtDWt0SMx0U+m/Ux84mTMq8yEce2uvrFUe2EjhrNVB1W/sxklmZWWQOEZVzOnYxpJzwfAur4GfcnvSeWWtsbXM49jEhJyuJQ3LE4ZnmGb7X3UaqQ6EX0bvfeFFDPahrbre1lruTuMAq6YyEW+4dWE+VZB3eGNS6te6rGM9uXZEc+vfIO301+FWdXIQD4A3e0885Rh9Cs4ccs6qwvNQUQ4z6eyz3NV5jdmZ+jCqCSGWzJLc0mHmdLp3/4Zj5v5pbmal7tbI5AJS/kluZHiffqOhcLwy+m5ojmyuR4y85AALAm46tVHUKzol2NZtdga+TzvTmg2bid+XOF2PZ1dy6/zLYbIRuau7eXNSvZsqFZz7rE/3W7CeXK8C1TqGV9h9QoHu37asw3cv+1yiwlCvyWFWq992fzfmAWCo0QcCgn0MBzLN49vjsqFHMch/MRz/LJ7iDRp/gUn2JH8P/2cICWWjfM1AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0yMFQxNTozMjozMyswMDowMBlsbSMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMjBUMTU6MzI6MzMrMDA6MDBoMdWfAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADI1NunDRBkAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjU2ejIURAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjEzODM1MTUzhtyiJwAAABJ0RVh0VGh1bWI6OlNpemUAMTA2NDVCkzbRfAAAADV0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL3RtcC90aHVtYmxyL2ltZzgzMjA2NzU0MTg2Nzc1NTQ5OTJHnc1HAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </SvgIcon>
  );
}

export default TurretSVG;
