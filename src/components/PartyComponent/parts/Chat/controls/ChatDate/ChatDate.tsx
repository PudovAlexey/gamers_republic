import { IconButton, styled, Typography, Zoom } from '@mui/material';
import { useAppSelector } from '../../../../../../hooks/typedReduxHooks';
import { TError } from '../../../../../../types/index';
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
  const date = parseTimeByString({
    time: firstMessageOnScreen.createdAt,
    formatter: ({ day, month, year }) => `${day}.${month}.${year}`
  })
  const parseDate: string = (date as TError)?.type === 'error' ? (date as TError)?.message : date as string

  return  <Typography fontSize={'11px'}>{parseDate}</Typography>
}

const DateWrapper = styled(IconButton)({
    borderRadius: '15%',
    background: 'rgba(0, 0, 0, .5)'
})

export { ChatDate };
