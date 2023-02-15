import React from 'react';
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
  const degs = position === 'left' ? 70 : 290
  const progress = useAppSelector(selector);
  const startLine = useAppSelector(startLineSelector)
  const altProgress = 100 - Number(progress);
  // if (title.toLowerCase() === 'games') {
  //   console.log(startLine?.clientHeight, 'start')
  // }
  let styles = {}
  const startRect = startLine && $.rect(startLine)
  if (position === 'left') {
    styles.left = startRect?.x - startRect?.width - 90 + 'px'
  } else {

  }
  styles.top = startRect?.height - 40 + 'px'

  const Title = styled(TitleText)({
    position: 'absolute',
    background: `linear-gradient(${degs}deg, ${firstColor} ${progress}%, ${secondColor} ${altProgress}%)`,
    ...styles
  });

  return <Title>{title}</Title>;
});

export { SmoothTitle };
