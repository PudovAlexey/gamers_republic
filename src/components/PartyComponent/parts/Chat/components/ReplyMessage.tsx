import { Box } from '@mui/system';
import ReplyIcon from '@mui/icons-material/Reply';
import React from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import { styleComponent } from '../styles';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
function ReplyMessage() {
  const theme = useTheme();
  const styles = styleComponent(theme);
  return (
    <Paper sx={styles.replyBox}>
      <ReplyIcon />
      <Box sx={styles.replyBox}>
        <Box>Here IMG</Box>
        <Box sx={styles.replyMessageInfo}>
          <Typography sx={styles.replyUserName}>Pudov Aleksey</Typography>
          <Typography sx={styles.replyMessage}>
            Here Some message Here Some message Here Some message Here Some
            message
          </Typography>
        </Box>
      </Box>
      <IconButton
      sx={styles.replyCloseButton}
      >
        <CloseIcon/>
      </IconButton>
    </Paper>
  );
}

export { ReplyMessage };
