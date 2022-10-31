import { Button, Box } from "@mui/material"
import ToolbarComponent from "../../../../components/reusable/ToolbarComponent/ToolbarComponent"
import MenuIcon from '@mui/icons-material/Menu';
import GameCount from "../gameCount/GameCount";
import GameTurn from "../gameTurn/GameTurn";
import { styleComponent } from "../../styles";
import { useTheme } from "@emotion/react";
function Toolbar({countWin, iconsDict, turnState, setPause}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    function onOpenMenu() {
       setPause(true)
    }
    return (
        <ToolbarComponent justifyContent="right" width="100%">
        <Box sx={styles.game_count}>
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