import { useTheme } from "@emotion/react";
import { FormControl, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useAppSelector } from "../../../../hooks/typedReduxHooks";
import { AuthContext } from "../../../AuthContext/AuthContext";
import AvatarComponent from "../../../reusable/AvatarComponent/AvatarComponent";
import { dinamicStyles, styleComponent } from "./styles";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import { DateViewer } from "./components/DateViewer";
import { parseTime, parseTimeByString } from "../../../../utils/timer/timer";

function ChatComponent() {
    const [AuthUser] = useContext(AuthContext)
    const {messages} = useAppSelector((store) => 
    store.partySlice)
    const theme = useTheme()
    const styles = styleComponent(theme)
    
    return (
        <Box sx={styles.layout}>
            <Box sx={styles.messageBox}>
            {
                messages.map(({message, userId, createdAt}, idx, messages) => {
                    
                    return (
                        <Box>
                            <DateViewer
                            prevMessageDate={messages[idx - 1]?.createdAt}
                            messageDate={createdAt}
                            nextMessageDate={messages[idx + 1]?.createdAt}
                            />
                            <Box sx={{
                            ...styles.message,
                            ...dinamicStyles.chatByUser(userId, AuthUser)
                        }}>
                            <Box sx={styles.messageItem}>
                            <Box sx={{
                                ...styles.messageInfo,
                                ...dinamicStyles.avatarByUser(userId, AuthUser)
                            }}>
                            <AvatarComponent sx={{
                                flexDirection: 'row-reverse',
                                alignItems: 'end',
                                color: '#f8f8f8',
                                justifyContent: 'space-around',
                                width: "60%"
                            }} {...AuthUser}/>
                            </Box>
                            <Paper sx={styles.messageText}>
                            {message}
                            <Typography sx={styles.dateText}>{
                                parseTimeByString({
                                    time: createdAt,
                                     formatter: ({hours, minutes}) => `${hours}:${minutes}`
                                })
                            }</Typography>
                                </Paper>               
                            </Box>
                        </Box>
                        </Box>
                    )
                })
            }
            </Box>
            <FormControl sx={styles.input} fullWidth>
            <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Box>
                <CameraAltIcon/>
                <SendIcon/>
              </Box>
            </InputAdornment>
          ),
        }}/>
            </FormControl>
           
        </Box>
    )
}

export {
    ChatComponent
}