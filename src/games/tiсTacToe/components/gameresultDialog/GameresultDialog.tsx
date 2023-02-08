import DialogControl from "../../../../components/reusable/Dialog/DialogControl"
import { Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
import GameTurn from "../gameTurn/GameTurn";
import GameCount from "../gameCount/GameCount";
import { clearField } from "../../../utils/fiels";
import { oposite } from "../../utils/utils";
import { EGameItems } from "../../ts/enums";
import { TGameField, TGamersConfig, TIconsDict } from "../../ts/types";
import { ERoutes } from "../../../../routes";

type TControlProps = {
  dialogOpen: boolean
  setDialogOpen: (value: boolean) => void
  turnState: EGameItems
  setTurnState: (value: EGameItems) => void
  setDraw: (value: boolean) => void
  fild: TGameField
  iconsDict: TIconsDict
  draw: boolean
  countWin: TGamersConfig
  setFieldState: (value: TGameField) => void
}

function GameresultDialog({
    dialogOpen, 
    setDialogOpen,
    turnState,
    setTurnState,
    setFieldState,
    setDraw,
    fild,
    iconsDict,
    draw,
    countWin
}: TControlProps) {
    const navigate = useNavigate()
    function onStartNewGame() {
        let reverseState = oposite(turnState);
        setTurnState(reverseState);
        console.log(clearField(fild))
        setFieldState(fild);
        setDialogOpen(false);
        setDraw(false);
      }
    
      function onOut() {
        setFieldState(fild);
        setDraw(false);
        setDialogOpen(false);
        navigate(ERoutes.Games);
      }
    return (
        <DialogControl
        dialogActions={[
          {
            text: 'startNewGame',
            onClick: onStartNewGame,
          },
          {
            text: 'Out',
            onClick: onOut,
          },
        ]}
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="the game was over"
      >
        <Box>
          <Typography variant="h5">
            {draw
              ? 'The match ended in a draw'
              :   
            <GameTurn
            text={'At these match was win is'}
            isResult={true}
            turnState={turnState}
            iconsDict={iconsDict}
            />
              }
          
          </Typography>
          <Typography variant="h6">
            <GameCount
            iconsDict={iconsDict}
            countWin={countWin}
            />
          </Typography>
        </Box>
      </DialogControl>
    )
}

export default GameresultDialog