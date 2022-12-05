import React from "react"
import { Box } from "@mui/system"
import { styleComponent } from "../styles"
import { Typography, useTheme } from "@mui/material"
import { parseTimeByString } from "../../../../../utils/timer/timer"

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
function DateViewer({
    prevMessageDate = null, 
    messageDate, 
    nextMessageDate = null
}) {

    const theme = useTheme()
    const styles = styleComponent(theme)
    let date = new Date(messageDate) > new Date(prevMessageDate) ? prevMessageDate : nextMessageDate;
    let dateDiff = compareMessageDates(messageDate, date || messageDate);

    const dateView = (
        <Box sx={styles.dateViewer}>
            <Typography sx={styles.monthText}>
                {parseTimeByString({
                    time: messageDate,
                    formatter: ({stringMonth, day, year}) => `${day} ${stringMonth} ${year}`
                })}
            </Typography>
        </Box>
    )
    return !dateDiff ? null : dateView

}

export {
    DateViewer
}