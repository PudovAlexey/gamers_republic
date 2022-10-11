import React from "react";
import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  Switch,
  Typography,
  Box,
  Input,
} from "@mui/material";
import { parseTime } from "../../utils/timer/timer";

export function gameMenu({
  setStartGame,
  navigate,
  gameParams,
  setGameParams,
}) {
  function SideSelect({action}) {
    return (
      <ButtonGroup>
        <Button onClick={() =>action("Black")}>Black</Button>
        <Button onClick={() => action("Black")}>Red</Button>
      </ButtonGroup>
    );
  }

  function onSetSide(e) {
    setGameParams(params => ({
      ...params,
      side: {
        top: e,
        bottom: e === "Black" ? "Red" : "Black"
      }
  }))
  }

  function onSetFirstStep(e) {
    console.log(e);
    setGameParams(params => ({
        ...params,
        firstStep: e
    }))
  }

  function onToggleTimer() {
    setGameParams((prev) => ({
      ...prev,
      timer: { ...prev.timer, isOn: !prev.timer.isOn },
    }));
  }
  function onChangeTimer() {}
  return {
    node: { virtual: true },
    children: [
      {
        node: {
          text: "Start Game",
          action: function () {
            console.log("startGame");
            setStartGame((prev) => !prev);
          },
        },
      },
      {
        node: { text: "Options" },
        children: [
          {
            node: {
              text: "Side",
              control: (
                <List>
                  <ListItem>
                    <Typography>On Top:</Typography>
                    <SideSelect action={onSetSide} />
                  </ListItem>
                </List>
              ),
            },
          },
          {
            node: {
              text: "First Step",
              control: <SideSelect action={onSetFirstStep} />,
            },
          },
          {
            node: {
              text: "Timer",
              control: (
                <Box>
                  <Box>
                    <Typography>Timer On:</Typography>
                    <Switch
                      onChange={onToggleTimer}
                      defaultChecked={!gameParams.isOn}
                    />
                  </Box>
                  <Box>
                    {/* {
                    gameParams.timer.isOn ?
                      <Box>
                        <Typography>set Timer:</Typography>
                        <Input
                          value={gameParams.timer.tick}
                          onChange={onChangeTimer}
                          type="number"
                        ></Input>
                      </Box>
                     : null
                     } */}
                     {JSON.stringify(gameParams.timer.isOn)}
                  </Box>
                </Box>
              ),
            },
          },
        ],
      },
      {
        node: {
          text: "Out",
          action: function () {
            navigate("/games");
          },
        },
        children: "",
      },
    ],
  };
}
