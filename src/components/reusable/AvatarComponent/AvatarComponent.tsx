import { Avatar, Typography } from "@mui/material"

function AvatarComponent({userName, avatarSrc, name, surname}) {
    return (
        <Box>
            <Avatar src={avatarSrc}>
                {name[0]}{surname[0]}
            </Avatar>
            <Typography>
                {userName}
            </Typography>
        </Box>
    )
} 

export default AvatarComponent