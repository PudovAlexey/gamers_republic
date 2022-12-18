import { Box } from '@mui/system';
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../../../../../hooks/typedReduxHooks';
function ReplyMessage() {
  const {replyMessage} = useAppSelector((selector) => selector.partySlice)
  if (!replyMessage) return null
  return (
    <Paper>
      <ReplyIcon />
      <Box>
        <Box>Here IMG</Box>
        <Box>
          <Typography>Pudov Aleksey</Typography>
          <Typography>
            {replyMessage.message}
          </Typography>
        </Box>
      </Box>
      <IconButton
      >
        <CloseIcon/>
      </IconButton>
    </Paper>
  );
}

export { ReplyMessage };
