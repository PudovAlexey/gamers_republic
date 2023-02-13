import { Typography } from '@mui/material';
import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
const startAnimation = 60;

function DecorativeCode({ selector }) {
  const topRef = useRef();
  const bottomTextRef = useRef();
  const progress = useAppSelector(selector);

  useLayoutEffect(() => {
    if (progress <= startAnimation) {
        console.log('animation start')
      gsap.to(topRef.current, {
        duration: 2,
        text: { value: 'This is the new text', delimiter: ' ' },
        ease: 'none',
      });
    }
  });
  return (
    <React.Fragment>
      <Typography ref={topRef} color={'#d93644'}>
        VLRT PR0T0C0L
      </Typography>
      <Typography ref={bottomTextRef} color={'#d93644'}>
        MR0C - SWD - BR4
      </Typography>
    </React.Fragment>
  );
}

export { DecorativeCode };
