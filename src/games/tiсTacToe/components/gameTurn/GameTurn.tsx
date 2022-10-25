import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { styleComponent } from "../../styles";
import { oposite } from "../../utils/utils";

function GameTurn({text, isResult, turnState, iconsDict}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    let reverseState;
    if (isResult) reverseState = oposite(turnState);
    return (
        <Typography variant="h6">
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