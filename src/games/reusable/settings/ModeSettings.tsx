import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Switch,
  Typography,
  Box,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import Timer from '../../../components/reusable/Timer/Timer';
import { CheckBox } from '@mui/icons-material';
function ModeSettings({ gameParams, setGameParams}) {

    function onChangeMode(variant) {
        console.log(variant)
    }
 
  return (
   <>
    <List dense sx={{
       width: '100%',   
    }}>
        {
            gameParams.gameWith.map((variant, idx) => {
                const Icon = variant.value
                return (
                    <ListItem
                key={idx}
                secondaryAction={
                  <CheckBox
                    edge="end"
                    onChange={() => onChangeMode(variant)}
                    checked={variant.checked}
                    inputProps={{ 'aria-labelledby': idx }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Icon/>
                  </ListItemAvatar>
                  <ListItemText id={idx} primary={variant.key} />
                </ListItemButton>
              </ListItem>
                )
            })
        }
    </List>
   </>
  );
}

export default ModeSettings;
