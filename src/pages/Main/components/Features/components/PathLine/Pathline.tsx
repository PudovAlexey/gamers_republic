import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/typedReduxHooks';
import { setStartLine } from '../../../../animations/lines/homeAnimationSlice';
import { fullProgressSelector, fullProgressStartLineSelector, progressFeatureLineSelector, progressFeatureStartLineSelector } from '../../../../animations/lines/selectors';

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
        viewBox="0 0 1490 847"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="105%"
      >
        <g clip-path="url(#clip0_113_15)" filter="url(#filter0_d_113_15)">
          {/* <path
            d="M1438 86.3036C1452.43 86.3036 1444.62 86.3036 1453 86.3036V387.545L1362.8 422.42H856.739L573.446 733.265H182.594L35 799.478V848"
            stroke="#D93644"
            stroke-width="10"
          /> */}
          {/* <path
            ref={pathRef}
            d="M858 -1C858 43.3604 858 75.4835 858 86H881"
            stroke="#F8F8F8"
            stroke-width="10"
          /> */}
          <PathMain/>
          <PathStart/>
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

function PathStart() {
  const strokeDeshOffset = useAppSelector(progressFeatureStartLineSelector);
  const strokeDasharray = useAppSelector(fullProgressStartLineSelector);
  const dispatch = useAppDispatch();
  console.log(strokeDeshOffset, 'stroke')
  const pathRef = useRef();
  useEffect(() => {
    dispatch(
      setStartLine({
        ref: pathRef.current,
        type: 'featuresStartLine',
      })
    );
  });
  return (
    <path
    ref={pathRef}
    d="M858 -1C858 43.3604 858 75.4835 858 86H881"
    stroke="#F8F8F8"
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
  const strokeDeshOffset = useAppSelector(progressFeatureLineSelector);
  const strokeDasharray = useAppSelector(fullProgressSelector);
  return (
    <path
    d="M1438 86.3036C1452.43 86.3036 1444.62 86.3036 1453 86.3036V387.545L1362.8 422.42H856.739L573.446 733.265H182.594L35 799.478V848"
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
