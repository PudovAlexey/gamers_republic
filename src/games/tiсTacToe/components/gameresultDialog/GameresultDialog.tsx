import DialogControl from "../../../../components/reusable/Dialog/DialogControl"
import { Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
import GameTurn from "../gameTurn/GameTurn";
import GameCount from "../gameCount/GameCount";
import { clearField } from "../../../utils/fiels";
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
}) {
    const navigate = useNavigate()
    function onStartNewGame() {
        let reverseState = turnState === 'X' ? 'O' : 'X';
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
        navigate('/games');
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