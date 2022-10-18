import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"
import { styleComponent } from "../../styles"
function GameCount({iconsDict, countWin}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Typography>
        <img
        style={styles.icon}
          src={iconsDict['O'].value}
        />
        : {countWin['O']}
        <img
          style={styles.icon}
          src={iconsDict['X'].value}
        />
        : {countWin['X']}
      </Typography>
    )
}

export default GameCount