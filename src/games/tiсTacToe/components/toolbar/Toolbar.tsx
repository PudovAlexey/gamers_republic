import { Button, Box } from "@mui/material"
import ToolbarComponent from "../../../../components/reusable/ToolbarComponent/ToolbarComponent"
import MenuIcon from '@mui/icons-material/Menu';
import GameCount from "../gameCount/GameCount";
import GameTurn from "../gameTurn/GameTurn";
function Toolbar({countWin, iconsDict, turnState, setPause}) {

    function onOpenMenu() {
        console.log('pause')
       setPause(true)
    }
    return (
        <ToolbarComponent justifyContent="right" width="100%">
        <Box>
        <GameCount 
        iconsDict={iconsDict}
        countWin={countWin}
        />
        </Box>
        <Box>
        <GameTurn
        text={"Now turn is"}
        isResult={false}
        turnState={turnState}
        iconsDict={iconsDict}
        />
        </Box>
        <Button onClick={onOpenMenu}>
            <MenuIcon/>
        </Button>
      </ToolbarComponent>
    )
}

export default Toolbar