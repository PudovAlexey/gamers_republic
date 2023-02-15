import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/typedReduxHooks';
import { setStartLine } from '../../../animations/lines/homeAnimationSlice';
import { progressWhatsNewSelector } from '../../../animations/lines/selectors';

function PathLine() {
  const pathRef = useRef();
  const dispatch = useAppDispatch();
  const strokeDeshOffset = useAppSelector(progressWhatsNewSelector);
  const strokeDasharray = 2000;
  useEffect(() => {
    dispatch(
      setStartLine({
        ref: pathRef.current,
        type: 'whatsNewStartLine',
      })
    );
  });
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
          strokeLinecap: 'round',
        }}
      >
        <g clip-path="url(#clip0_115_7)" filter="url(#filter0_d_115_7)">
          <path
            ref={pathRef}
            d="M664 63C1176.44 63 1133.73 63 1165.75 63L1435 243.804V847"
            stroke="#0F1923"
            stroke-width="10"
          />
          <path
            d="M35 0C35 37.7227 35 57.7178 35 63H77"
            stroke="#D93644"
            stroke-width="10"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_115_7"
            x="-4"
            y="0"
            width="1495"
            height="848"
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
              result="effect1_dropShadow_115_7"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_115_7"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_115_7">
            <rect width="1487" height="840" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export { PathLine };