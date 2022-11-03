import React, {useState} from 'react'
import { TextField, Box, Button } from "@mui/material"
import useFieldControl from '../../hooks/useFieldControl'
import { styleComponent } from './styles'
import { useTheme } from '@emotion/react'


function LoginPage({}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    const [record, output] = useFieldControl()

    function onLoginPress() {
        console.log(output)
    }

    return (
       <Box sx={styles.login.layout}>
         <Box sx={styles.login}>
            <TextField
                type={'text'}
                {...record('text')}
             />
            <TextField
            type={'password'}
            {...record('password')}
            />
            <Button onClick={onLoginPress}>Login</Button>
        </Box>
       </Box>
    )
}

export default LoginPage