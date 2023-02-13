import { Typography } from '@mui/material';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
const startAnimation = 70;
gsap.registerPlugin(TextPlugin);

function DecorativeCode({ selector }) {
  const [called, setCalled] = useState(false);
  const topRef = useRef();
  const bottomTextRef = useRef();
  const loading = useRef();
  const progress = useAppSelector(selector);

  useLayoutEffect(() => {
    console.log(progress, 'progress');
    if (progress <= startAnimation && !called) {
      const tl = gsap.timeline({ delay: 1 });
      // console.log(topRef.current)
      tl.from(loading.current, {
        width: '0',
      });
      tl.to(loading.current, {
        width: '100%',
      });

      tl.to(topRef.current, {
        text: { value: 'VLRT PR0T0C0L', delimiter: ' ' },
        ease: 'none',
      });
      tl.to(bottomTextRef.current, {
        text: { value: 'MR0C - SWD - BR4', delimiter: ' ' },
        ease: 'none',
      });
      setCalled(true);
    }
  }, [called, setCalled, progress]);
  return (
    <React.Fragment>
      <Typography ref={topRef} color={'#d93644'}>
        Loading
      </Typography>
      <Typography ref={bottomTextRef} color={'#d93644'}>
        Waiting protocol stats
      </Typography>
      <svg width={'0%'} ref={loading} height={'10px'}>
        <line
          strokeWidth={'10'}
          stroke="#d93644"
          x1={'0vw'}
          y1={10}
          x2={'30vw'}
          y2={10}
        />
      </svg>
    </React.Fragment>
  );
}

export { DecorativeCode };
