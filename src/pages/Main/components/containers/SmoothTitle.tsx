import React from 'react';
import { styled } from '@mui/system';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { useAppSelector } from '../../../../hooks/typedReduxHooks';

type TProps = {
  title: string;
  degs: number;
  selector: any;
  startLineSelector: any;
  firstColor: string;
  secondColor: string;
};

const SmoothTitle = React.memo(function ({
  title,
  degs,
  selector,
  firstColor,
  secondColor,
  startLineSelector
}: TProps) {
  const progress = useAppSelector(selector);
  const startLine = useAppSelector(startLineSelector)
  console.log(startLine, 'line')
  const altProgress = 100 - Number(progress);

  const Title = styled(TitleText)({
    background: `linear-gradient(${degs}deg, ${firstColor} ${progress}%, ${secondColor} ${altProgress}%)`,
  });

  return <Title>{title}</Title>;
});

export { SmoothTitle };
