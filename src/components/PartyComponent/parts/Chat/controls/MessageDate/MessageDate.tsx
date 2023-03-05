import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { TError } from "../../../../../../types/index";
import { parseTimeByString } from "../../../../../../utils/timer/timer";
import { messageByIdSelector, nextMessageSelector, previousMessageSelector } from "../../store/selectors/chatSelector";

function MessageDate({messageId}) {
  const prevMessage = useAppSelector((state) => previousMessageSelector(state, messageId))
  const message = useAppSelector((state) => messageByIdSelector(state, messageId))
  const nextMessage = useAppSelector((state) => nextMessageSelector(state, messageId))
  function datesParser(date) {
    if (date) {
      return Intl.DateTimeFormat('ru', {}).format(new Date(date));
    } else {
      return '';
    }
  }
  function compareMessageDates(currentDate, prevDate) {
    let parsedCurrentDate = datesParser(currentDate);
    let parsedPrevDate = datesParser(prevDate);
    let splitPrevDate = parsedPrevDate.split('.');
    return parsedCurrentDate
      .split('.')
      .filter((datePart, idx) => splitPrevDate[idx] !== datePart)
      .join('.');
  }
  let date = message.messageId > prevMessage?.messageId ? prevMessage?.createdAt : nextMessage?.createdAt;
  let dateDiff = compareMessageDates(message.createdAt, date || message.createdAt);
  const dateValue = parseTimeByString({
    time: message.createdAt,
    formatter: ({ day,stringMonth, year }) => `${day} ${stringMonth} ${year}`
})

const parseDate = (dateValue as TError)?.type === 'error' ? (dateValue as TError)?.message : dateValue as string
  return dateDiff && (
    <Stack direction={'row'} justifyContent={'center'}>
         <LineTypography variant="h6">{parseDate}</LineTypography>
    </Stack>
  )
}

const LineTypography = styled(Typography)({
    color: '#F8F8F8',
    position: 'relative',
    marginBottom: '15px',
    "&::after": {
        content: "''",
        position: 'absolute',
        left: -30,
        right: 0,
        top: 0,
        bottom: 0,
        borderBottom: '3px solid #F8F8F8'
        
    }
})

export default MessageDate;
