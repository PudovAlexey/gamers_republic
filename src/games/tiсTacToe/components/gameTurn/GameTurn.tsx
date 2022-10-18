import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { styleComponent } from "../../styles";

function GameTurn({text,isResult, turnState, iconsDict}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    let reverseState;
    if (isResult) reverseState = turnState === 'X' ? 'O' : 'X';
    return (
      <Typography variant="h5">
        {text}: {''}
        <img
          style={styles.icon}
          src={
            reverseState
              ? iconsDict[reverseState].value
              : iconsDict[turnState].value
          }
          alt={
            reverseState
              ? iconsDict[reverseState].value
              : iconsDict[turnState].key
          }
        />
      </Typography>
    );
}

export default GameTurn