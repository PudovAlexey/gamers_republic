import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/typedReduxHooks';
import { setStartLine } from '../../../animations/lines/homeAnimationSlice';
import { fullProgressSelector, fullProgressStartLineSelector, progressAboutSelector, progressStartAboutSelector } from '../../../animations/lines/selectors';
import { ELinesRef } from '../../../animations/lines/types';

function PathLine() {
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
      >
        <g clip-path="url(#clip0_115_16)" filter="url(#filter0_d_115_16)">
          <PathStart/>
          <PathMain/>
          {/* <path
            ref={pathRef}
            d="M1437 -30C1437 45.6 1437 80.8333 1437 89H1427"
            stroke="#D93644"
            stroke-width="10"
          />
          <path
            d="M1069 90C925.737 90 882.881 90 879.36 90L641.048 357H456"
            stroke="#D93644"
            stroke-width="10"
          /> */}
        </g>
        <defs>
          <filter
            id="filter0_d_115_16"
            x="-4"
            y="0"
            width="1497"
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
            <rect width="1489" height="838" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

function PathStart() {
  const strokeDeshOffset = useAppSelector(progressStartAboutSelector);
  const strokeDasharray = useAppSelector(fullProgressStartLineSelector);
  const dispatch = useAppDispatch();
  const pathRef = useRef();
  useEffect(() => {
    dispatch(
      setStartLine({
        ref: pathRef.current,
        type: ELinesRef.AboutStartLine,
      })
    );
  });
  return (
    <path
    ref={pathRef}
    d="M1437 -30C1437 45.6 1437 80.8333 1437 89H1427"
    stroke="#D93644"
    stroke-width="10"
    style={{
      strokeDashoffset: strokeDeshOffset + 'px',
      strokeDasharray: strokeDasharray + 'px',
      strokeLinecap: 'round',
      transition: 'all .5s ease-out',
    }}
  />
  );
}

function PathMain() {
  const strokeDeshOffset = useAppSelector(progressAboutSelector);
  const strokeDasharray = useAppSelector(fullProgressSelector);
  return (
    <path
    d="M1069 90C925.737 90 882.881 90 879.36 90L641.048 357H456"
    stroke="#D93644"
    stroke-width="10"
    style={{
      strokeDashoffset: strokeDeshOffset + 'px',
      strokeDasharray: strokeDasharray + 'px',
      strokeLinecap: 'round',
      transition: 'all .5s ease-out',
    }}
  />
  );
}

export { PathLine };
