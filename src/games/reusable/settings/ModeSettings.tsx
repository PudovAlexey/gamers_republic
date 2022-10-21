import React, { useEffect, useMemo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Checkbox
} from '@mui/material';
function ModeSettings({ gameParams, setGameParams}) {
  const selectedVariant = useMemo(() => {
    return gameParams.gameWith.find(i => i.checked)
  }, [])
  const [selectedMode, setSelectedMode] = useState(selectedVariant.key)

    function onChangeMode(variant) {
      setSelectedMode(variant.key)
    }

    useEffect(() => {
      setGameParams(param => {
        const updateWith = param.gameWith.map(item => ({
          ...item,
          checked: item.key === selectedMode
        }))
        return {
          ...param,
          gameWith: updateWith
        }
      })
    }, [selectedMode])
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
                onClick={() => onChangeMode(variant)}
                key={variant.key}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={variant.key === selectedMode}
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
