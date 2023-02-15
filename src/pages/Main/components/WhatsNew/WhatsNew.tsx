import './slickTheme.css';
import { Shield } from '../../../../assets/main/common/Shield';
import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { LabelCard } from '../../../../components/reusable/LabelCard/LabelCard';
import { FanView } from '../../../../components/reusable/FanView/FanView';
import ManImg from './img/Art.png';
import { PathLine } from './PathLine/PathLine';
import { useLayoutEffect, useRef } from 'react';
import {
  useAppDispatch, useAppSelector,
} from '../../../../hooks/typedReduxHooks';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import {
  whatsNewStartLineSelector,
  WhatsNewTitleProgressSelector,
} from '../../animations/lines/selectors';
import { $ } from '../../../../utils/DOM/DOM';
import { TitleText } from '../../../../components/reusable/layout/Typography';

const testIdx = new Array(100).fill('').map((_, idx) => idx + 1);
const testData = testIdx.reduce((dict, id) => {
  dict[id] = {
    title: `TEST ${id}`,
    link: {
      text: 'LINK',
      navTo: '',
    },
    description: 'TEST DESCRIPTION',
    icon: <Shield size={'100%'} />,
  };
  return dict;
}, {});

function WhatsNew() {
  const contentRef = useRef();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(
      setRef({
        type: 'whatsNewRef',
        ref: contentRef.current,
      })
    );
  });

  return (
    <WhatsNewBlock ref={contentRef}>
      <PathLine />
      <RelativeTitle>
        <SmoothTitle/>
      </RelativeTitle>
      <Man src={ManImg} />
      <Stack alignItems={'center'} spacing={1}>
        <SlickWrapper>
          <FanView
            fanIds={testIdx}
            fanData={testData}
            fanControl={(data) => {
              return <LabelCard {...data} />;
            }}
          />
        </SlickWrapper>
      </Stack>
    </WhatsNewBlock>
  );
}

function SmoothTitle() {
  const titleRef = useRef()
  const progress = useAppSelector(WhatsNewTitleProgressSelector);
  const startLine = useAppSelector(whatsNewStartLineSelector)
  const startRect = startLine && $.rect(startLine)

  const Title = styled(TitleText)({
    position: 'absolute',
    background: `linear-gradient(290deg, #d93644 ${progress}%, #0f1923 ${progress === 0 ? 0 + 'px' : "100px"})`,
    left: startRect?.x - startRect?.width + titleRef?.current?.offsetHeight * 0.3  + 'px',
    top: startRect?.height - (titleRef?.current?.offsetHeight || 0) * 0.5 + 'px'
  });

  return <Title ref={titleRef}>{"Whats new"}</Title>;
}

const RelativeTitle = styled(Box)({
  position: 'relative',
  color: '#0f1923',
  left: '0',
  top: '0',
});

const WhatsNewBlock = styled(Box)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  // padding: '0 10%',
  background: '#f8f8f8',
});

const Man = styled('img')({
  position: 'absolute',
  left: '0px',
});

const SlickWrapper = styled(Box)({
  width: '60%',
  position: 'absolute',
  right: '5vw',
  bottom: '2%',
});

export { WhatsNew };
