import './slickTheme.css';
import { Shield } from '../../../../assets/main/common/Shield';
import { Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  LabelCard,
} from '../../../../components/reusable/LabelCard/LabelCard';
import { FanView } from '../../../../components/reusable/FanView/FanView';
import ManImg from './img/Art.png'
import { TitleText } from '../../../../components/reusable/layout/Typography';
import { PathLine } from './PathLine/PathLine';


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
  return (
    <WhatsNewBlock>
        <PathLine/>
          <RelativeTitle>Whats new</RelativeTitle>
        <Man src={ManImg}/>
        <Stack alignItems={'center'} spacing={1}>
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
      </SlickWrapper>
        </Stack>
    </WhatsNewBlock>
  );
}

const RelativeTitle = styled(TitleText)({
  position: 'relative',
  color: '#0f1923',
  left: "8vw"
})

const WhatsNewBlock = styled(Box)({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  background: '#f8f8f8',
});

const Man = styled('img')({
  position: 'absolute',
  left: '0px'
})

const SlickWrapper = styled(Box)({
  width: '60%',
  position: 'absolute',
  right: '50px',
  bottom: "2%"
});

export { WhatsNew };
