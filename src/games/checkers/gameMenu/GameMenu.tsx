import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import MenuTimer from './items/settings/TimerSettings';
import { ERoutes } from '@/routes';
import { TMenuTree } from '@/games/checkers/gameMenu/types';

export function gameMenu({
  setStartGame,
  navigate,
  gameParams,
  setGameParams,
}): TMenuTree {
  function SideSelect({ action }) {
    return (
      <ButtonGroup>
        <Button variant="contained" onClick={() => action('Black')}>
          Black
        </Button>
        <Button variant="contained" onClick={() => action('Red')}>
          Red
        </Button>
      </ButtonGroup>
    );
  }

  function onSetSide(e) {
    setGameParams((params) => ({
      ...params,
      side: {
        top: e,
        bottom: e === 'Black' ? 'Red' : 'Black',
      },
    }));
  }

  function onSetFirstStep(e) {
    setGameParams((params) => ({
      ...params,
      firstStep: e,
    }));
  }
  return {
    node: { virtual: true },
    children: [
      {
        node: {
          text: 'Start Game',
          type: 'button',
          action: function () {
            setStartGame((prev) => !prev);
          },
        },
      },
      {
        node: {
          text: 'Options',
          type: 'control',
          control: <div>{'Add control'}</div>,
        },
        children: [
          {
            node: {
              text: 'Choose Top Side',
              type: 'control',
              control: <SideSelect action={onSetSide} />,
            },
          },
          {
            node: {
              text: 'Who first Step',
              type: 'control',
              control: <SideSelect action={onSetFirstStep} />,
            },
          },
          {
            node: {
              text: 'Timer',
              type: 'control',
              control: (
                <MenuTimer
                  setGameParams={setGameParams}
                  gameParams={gameParams}
                />
              ),
            },
          },
        ],
      },
      {
        node: {
          text: 'Out',
          type: 'button',
          action: function () {
            navigate(ERoutes.Games);
          },
        },
      },
    ],
  };
}
