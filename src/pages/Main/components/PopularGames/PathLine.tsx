import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { setStartLine } from '../../animations/lines/homeAnimationSlice';
import {
  fullProgressSelector,
  fullProgressStartLineSelector,
  progressGameLineSelector,
  progressGameStartLineSelector,
} from '../../animations/lines/selectors';
import { ELinesRef } from '../../animations/lines/types';

function PathLine() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
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
        <g clip-path="url(#clip0_110_4)" filter="url(#filter0_d_110_4)">
          <PathMain />
          <PathStart />
        </g>
        <defs>
          <filter
            id="filter0_d_110_4"
            x="-4"
            y="0"
            width="1498"
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
            <rect width="1490" height="842" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

function PathStart() {
  const strokeDeshOffset = useAppSelector(progressGameStartLineSelector);
  const strokeDasharray = useAppSelector(fullProgressStartLineSelector);
  const dispatch = useAppDispatch();
  const pathRef = useRef();
  useEffect(() => {
    dispatch(
      setStartLine({
        ref: pathRef.current,
        type: ELinesRef.GamesStartLineRef,
      })
    );
  });
  return (
    <path
      ref={pathRef}
      d="M745 1C745 54.2174 745 79.8406 745 86H445"
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
  const strokeDeshOffset = useAppSelector(progressGameLineSelector);
  const strokeDasharray = useAppSelector(fullProgressSelector);
  
  return (
    <path
      d="M61.083 86C45.7469 86 27.971 86 21 86V567.31L180.461 754.714H861V852"
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
