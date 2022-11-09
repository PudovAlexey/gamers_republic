import { useTheme } from "@emotion/react"
import { Box } from "@mui/system"
import { styleComponent } from "./styles"
function Header() {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Box sx={styles.header}
        >Header</Box>
    )
}

export {
    Header
}