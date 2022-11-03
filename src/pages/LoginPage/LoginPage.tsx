import React, {useState} from 'react'
import { TextField, Box, Button, IconButton } from "@mui/material"
import useFieldControl from '../../hooks/useFieldControl'
import { styleComponent } from './styles'
import { useTheme } from '@emotion/react'
import { MessageToast } from '../../components/reusable/MessageToast/MessageToast'
import api from '../../api/api'

function LoginPage({}) {
    const theme = useTheme()
    const styles = styleComponent(theme)
    const [record, output] = useFieldControl()
    const [authToast, setAuthToast] = useState<boolean>(false)
    const [errorToast, setErrorToast] = useState<boolean>(false)

    function onLoginPress() {
        if () {
            api.login(output)
            .then(res => {
                if (typeof res === 'boolean' && res) {
                    setAuthToast(true)
                } else {
                    setErrorToast(true)
                }
            })
        }
    }

    function onResetPassword() {
        
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
            <Box>
            <IconButton onClick={onResetPassword}>Forgot password</IconButton>
            <IconButton onClick={onLoginPress}>Login</IconButton>
            <MessageToast
            delay={3000}
            show={authToast}
            setShow={setAuthToast}
            title={"Validation Error"}
            message={"Error UserName"}
            severity={"error"}
            />
            </Box>
        </Box>
       </Box>
    )
}

export default LoginPage