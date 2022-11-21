import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../../hooks/typedReduxHooks";
import AvatarComponent from "../../../reusable/AvatarComponent/AvatarComponent";

function ChatComponent() {
    const {messages} = useAppSelector((store) => 
    store.partySlice)
    console.log(messages, 'messages')
    return (
        <Paper>
            {/* {
                messages.map(({message, createdAt}) => (
                    <Box>
                        <Box>
                        <AvatarComponent/>
                        <Typography>{}</Typography>
                        </Box>
                        <Paper>{message}<Paper/>
                    </Box>
                ))
            } */}
        </Paper>
    )
}

export {
    ChatComponent
}