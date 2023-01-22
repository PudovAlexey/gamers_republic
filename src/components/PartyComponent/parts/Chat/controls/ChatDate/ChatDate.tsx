import { IconButton, styled, Typography, Zoom } from '@mui/material';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { parseTimeByString } from '../../../../../../utils/timer/timer';
import {
  firstMessageDateOnScreenSelector,
  showNavItemsSelector,
} from '../../store/selectors/chatSelector';

function ChatDate() {
  const showNavItems = useAppSelector(showNavItemsSelector);
  return (
    <Zoom in={showNavItems}>
      <DateWrapper>
        <ChatText />
      </DateWrapper>
    </Zoom>
  );
}

function ChatText() {
  const firstMessageOnScreen = useAppSelector(firstMessageDateOnScreenSelector);
  if (!firstMessageOnScreen) return null;
  return  <Typography fontSize={'11px'}>{parseTimeByString({
    time: firstMessageOnScreen.createdAt,
    formatter: ({ day, month, year }) => `${day}.${month}.${year}`
})}</Typography>
}

const DateWrapper = styled(IconButton)({
    borderRadius: '15%',
    background: 'rgba(0, 0, 0, .5)'
})

export { ChatDate };
