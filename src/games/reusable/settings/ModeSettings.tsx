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
  ListItemText,
  Checkbox
} from '@mui/material';
function ModeSettings({ gameParams, setGameParams}) {
  const [gameMode, setGameMode] = useState(gameParams)

    function onChangeMode(variant, variantIdx) {
      setGameMode(param => {
          const updateWith = param.gameWith.map(item => ({
            ...item,
            checked: item.key === variant.key
          }))
          return {
            ...param,
            gameWith: updateWith
          }
        })
    }

    useEffect(() => {
      setGameParams({...gameMode})
    }, [gameMode])
  return (
   <>
    <List dense sx={{
       width: '100%',   
    }}>
        {
            gameMode.gameWith.map((variant, idx) => {
                const Icon = variant.value
                return (
                    <ListItem
                onClick={() => onChangeMode(variant)}
                key={idx}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={variant.checked}
                    onClick={() => onChangeMode(variant)}
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
