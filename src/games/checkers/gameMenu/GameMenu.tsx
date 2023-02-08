import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Switch,
  Typography,
  Box,
  Input,
} from '@mui/material';
import { parseTime } from '../../../utils/timer/timer';
import Timer from '../../../components/reusable/Timer/Timer';
import MenuTimer from './items/settings/TimerSettings';
import { ERoutes } from '../../../routes';

export function gameMenu({
  setStartGame,
  navigate,
  gameParams,
  setGameParams,
}) {
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
    console.log(e);
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
          action: function () {
            setStartGame((prev) => !prev);
          },
        },
      },
      {
        node: { text: 'Options' },
        children: [
          {
            node: {
              text: 'Choose Top Side',
              control: <SideSelect action={onSetSide} />,
            },
          },
          {
            node: {
              text: 'Who first Step',
              control: <SideSelect action={onSetFirstStep} />,
            },
          },
          {
            node: {
              text: 'Timer',
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
          action: function () {
            navigate(ERoutes.Games);
          },
        },
        children: '',
      },
    ],
  };
}
