import { Button } from "@mui/material"
import ToolbarComponent from "../../../../components/reusable/ToolbarComponent/ToolbarComponent"
import MenuIcon from '@mui/icons-material/Menu';
import GameCount from "../gameCount/GameCount";
import GameTurn from "../gameTurn/GameTurn";
function Toolbar({countWin, iconsDict, turnState}) {

    function onOpenMenu() {
        console.log('menu must be open')
    }
    return (
        <ToolbarComponent justifyContent="right" width="30%">
        {/* {gameCount} */}
        <GameCount 
        iconsDict={iconsDict}
        countWin={countWin}
        />
        {/* {gameTurn('Now turn is', false)} */}
        <GameTurn
        text={"Now turn is"}
        isResult={false}
        turnState={turnState}
        iconsDict={iconsDict}
        />
        <Button onClick={onOpenMenu}>
            <MenuIcon/>
        </Button>
      </ToolbarComponent>
    )
}

export default Toolbar