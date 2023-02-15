import './slickTheme.css';
import { Shield } from '../../../../assets/main/common/Shield';
import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { LabelCard } from '../../../../components/reusable/LabelCard/LabelCard';
import { FanView } from '../../../../components/reusable/FanView/FanView';
import ManImg from './img/Art.png';
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { PathLine } from './PathLine/PathLine';
import { useLayoutEffect, useRef } from 'react';
import {
  useAppDispatch,
} from '../../../../hooks/typedReduxHooks';
import { setRef } from '../../animations/lines/homeAnimationSlice';
import {
  whatsNewStartLineSelector,
  WhatsNewTitleProgressSelector,
} from '../../animations/lines/selectors';
import { SmoothTitle } from '../containers/SmoothTitle';

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
        <SmoothTitle
          title={'Whats new'}
          selector={WhatsNewTitleProgressSelector}
          position={'right'}
          firstColor={"#d93644"}
          secondColor={"#0f1923"}
          startLineSelector={whatsNewStartLineSelector}
        />
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

const RelativeTitle = styled(TitleText)({
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
