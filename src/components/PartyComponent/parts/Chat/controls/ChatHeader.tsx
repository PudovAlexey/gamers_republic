import { Divider, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/typedReduxHooks';
import useDebounce from '../../../../../hooks/useDebounce';
import SearchField from '../../../../reusable/SearchField/SearchField';
import { SEARCH_MESSAGE } from '../store/actionCreators';
import { chatInfoSelector } from '../store/selectors/chatSelector';
function ChatHeader() {
  const chatInfo = useAppSelector(chatInfoSelector);
  const dispatch = useAppDispatch();
  const {
    notDebounced: [value, setValue],
    debounced: [debounceValue, setDebounceValue],
  } = useDebounce('',
    1000
  );

  useEffect(() => setDebounceValue(value), [value, setDebounceValue])

  useEffect(() => {
    dispatch(SEARCH_MESSAGE(debounceValue))
  }, [debounceValue, dispatch])
  return (
    <Box>
      <ChatLayout>
        <Typography sx={{ color: 'white' }} variant="h4">
          {chatInfo && chatInfo.roomName}
        </Typography>
        <BottomToolbar direction={'row'} spacing={1}>
          <SearchField
            onChange={setValue}
            value={value}
            folding={true}
          />
        </BottomToolbar>
      </ChatLayout>
      <Divider />
    </Box>
  );
}

const ChatLayout = styled(Box)({
  position: 'relative',
  height: '70px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const BottomToolbar = styled(Stack)({
  position: 'absolute',
  bottom: '15px',
  right: '15px',
});

export { ChatHeader };
