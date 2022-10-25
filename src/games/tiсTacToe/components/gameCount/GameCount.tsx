import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"
import AvatarComponent from "../../../../components/reusable/AvatarComponent/AvatarComponent"
import { styleComponent } from "../../styles"
function GameCount({iconsDict, countWin}) {
    const {me, rival} = countWin
    const theme = useTheme()
    const styles = styleComponent(theme)
    console.log(me.data.avatarSrc)
    return (
        <Typography>
        <AvatarComponent
        avatarSrc={me.data.avatarSrc}
        userName={me.data.userName}
        name={me.data.name}
        surname={me.data.surname}
        />
        <img
        style={styles.icon}
          src={iconsDict[me.key].value}
        />
        : {countWin.me.countWin}
        <AvatarComponent
        avatarSrc={rival.data.avatarSrc}
        userName={rival.data.userName}
        />
        <img
          style={styles.icon}
          src={iconsDict[rival.key].value}
        />
        : {countWin.rival.countWin}
      </Typography>
    )
}

export default GameCount