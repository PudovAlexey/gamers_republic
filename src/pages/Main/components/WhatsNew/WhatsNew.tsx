import './slickTheme.css';
import { Shield } from '../../../../assets/main/common/Shield';
import { styled } from '@mui/material';
import { Box } from '@mui/system';
import {
  LabelCard,
  TCard,
} from '../../../../components/reusable/LabelCard/LabelCard';
import { FanView } from '../../../../components/reusable/FanView/FanView';

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
  //   const mockData: TCard= {
  //     title: `TEST 1`,
  // link: {
  //     text: "LINK",
  //     navTo: ""
  // },
  // description: 'TEST DESCRIPTION',
  // icon: <Shield size={'100%'}/>
  // }
  return (
    <WhatsNewBlock>
      <SlickWrapper>
        <FanView
          fanIds={testIdx}
          fanData={testData}
          fanControl={(data) => {
            return (
              <LabelCard {...data} />
            );
          }}
        />
        {/* <Slider {...slickOptions} className={'verticalSlider'}>
            {LabelCards()}
          </Slider> */}
      </SlickWrapper>
    </WhatsNewBlock>
  );
}

const WhatsNewBlock = styled(Box)({
  background: '#f8f8f8',
  height: '100vh',
  width: '100vw',
});

const SlickWrapper = styled(Box)({
  width: '80%',
  height: '100vh',
  margin: 'auto auto',
  position: 'relative',
  top: '15vh',
});

export { WhatsNew };
