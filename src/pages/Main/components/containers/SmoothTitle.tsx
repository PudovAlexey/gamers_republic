import React, { useRef } from 'react';
import { styled } from '@mui/system';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { useAppSelector } from '../../../../hooks/typedReduxHooks';
import { $ } from '../../../../utils/DOM/DOM';

type TProps = {
  title: string;
  position: string;
  selector: any;
  startLineSelector: any;
  firstColor: string;
  secondColor: string;
};

const SmoothTitle = React.memo(function ({
  title,
  position,
  selector,
  firstColor,
  secondColor,
  startLineSelector
}: TProps) {
  const titleRef = useRef()
  const degs = position === 'left' ? 70 : 290
  const progress = useAppSelector(selector);
  const altProgress = 100 - Number(progress);
  const startLine = useAppSelector(startLineSelector)
  if (title.toLowerCase() === 'games') {
    console.log('call in games')
  }
  let styles = {}
  const startRect = startLine && $.rect(startLine)
  if (position === 'left') {
    styles.left = startRect?.x - startRect?.width - (titleRef?.current?.offsetHeight || 0) + 'px'
  } else {
    styles.right = startRect?.x - startRect?.width - (titleRef?.current?.offsetHeight || 0) + 'px'
  }
  styles.top = startRect?.height - (titleRef?.current?.offsetHeight || 0) * 0.5 + 'px'

  const Title = styled(TitleText)({
    position: 'absolute',
    background: `linear-gradient(${degs}deg, ${firstColor} ${progress}%, ${secondColor} ${altProgress}%)`,
    ...styles
  });

  return <Title ref={titleRef}>{title}</Title>;
});

export { SmoothTitle };
