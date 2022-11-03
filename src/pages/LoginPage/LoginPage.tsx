import React, {useState} from 'react'
import { TextField, Box } from "@mui/material"


function LoginPage({}) {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    function onChangeLogin(e: React.ChangeEvent<InputEvent>) {
        const {value} = e.target
        setPassword(value)
    }

    function onChangePassword(e: React.ChangeEvent<InputEvent>) {
        const {value} = e.target
        setPassword(value)
    }

    return (
        <Box>
            <TextField
                type={'text'}
                value={login}
                onChange={(e) => onChangeLogin(e)}
             />
            <TextField
            type={'password'}
            value={password}
            onChange={(e) => onChangePassword(e)}
            />
        </Box>
    )
}

export default LoginPage