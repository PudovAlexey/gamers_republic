import { Paper, Typography, useTheme } from "@mui/material"
import { styleComponent } from "../../styles"
import { parseTimeByString } from "../../../../../../utils/timer/timer"
import { AddsViewer } from "../addsViewer/AddsViewer"
import { MarkdownEditor } from "../../../../../reusable/MkEditor/MkEditorComponent"

function Message({message, adds, createdAt}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    return (
        <Paper sx={styles.messageText}>
            <MarkdownEditor
            value={message}
            view={{
                menu: false,
                md: false,
                html: true
            }}
            />
        {adds && (
          <AddsViewer adds={adds}/>
        )}
        <Typography sx={styles.dateText}>
          {parseTimeByString({
            time: createdAt,
            formatter: ({ hours, minutes }) =>
              `${hours}:${minutes}`,
          })}
        </Typography>
      </Paper>
    )
}

export {
    Message
}