import { useTheme } from "@emotion/react"
import { Box, Typography } from "@mui/material"
import AvatarComponent from "../../../../components/reusable/AvatarComponent/AvatarComponent"
import { styleComponent } from "../../styles"
import { TGamersConfig, TIconsDict } from "../../ts/types"

type TControlProps = {
  iconsDict: TIconsDict
  countWin: TGamersConfig
}

function GameCount({iconsDict, countWin}: TControlProps) {
    const {me, rival} = countWin
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <>
        {/* <AvatarComponent
        avatar={me?.data?.avatar}
        username={me?.data?.username}
        name={me?.data?.name}
        surname={me?.data?.surname}
        />   */}
        <img
        style={styles.icon}
          src={iconsDict[me.key].value}
        />
        : <Typography variant="h4">{countWin.me.countWin}</Typography>
        <Typography variant="h4">-VS-</Typography>
        {/* <AvatarComponent
         avatar={rival.data.avatar}
         username={rival.data.username}
         name={rival.data.name}
         surname={rival.data.surname}
        /> */}
        <img
          style={styles.icon}
          src={iconsDict[rival.key].value}
        />
        : <Typography variant="h4">{countWin.rival.countWin}</Typography>
      </>
    )
}

export default GameCount