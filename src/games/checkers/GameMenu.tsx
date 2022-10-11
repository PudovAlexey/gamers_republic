import { Button, ButtonGroup, List, ListItem, Switch, Typography, Box, Input} from "@mui/material";
import { parseTime } from "../../utils/timer/timer";

export function gameMenu({
  setStartGame,
  navigate,
  gameParams,
  setGameParams,
}) {
  function SideSelect(action) {
    return (
      <ButtonGroup>
        <Button>Black</Button>
        <Button>Red</Button>
      </ButtonGroup>
    );
  }

  function onSetSide() {

  } 

  function onSetFirstStep() {
    setGameParams(params => ({
        ...params,
        firstStep
    }))
  }
  
  function onToggleTimer() {
    setGameParams(prev => ({
        ...prev,
        timer: {...prev.timer, isOn: !prev.timer.isOn}
    }))
  }
  function onChangeTimer() {

  }
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
          { node: { text: "First Step", control: <SideSelect action={onSetFirstStep}/> } },
          { node: { text: "Timer", control: (
            <Box>
                <Box>
                <Typography>Timer On:</Typography>
            <Switch onChange={onToggleTimer} checked={gameParams.isOn}/>
                </Box>
                {
                    gameParams.isOn ? <Box>
                    <Typography>set Timer:</Typography>
                    <Input value={parseTime(gameParams.timer.tick)} onChange={onChangeTimer} type="number"></Input>
                    </Box> : null
                }
            </Box>
          ) } },
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
