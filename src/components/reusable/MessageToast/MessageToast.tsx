import React, {useState, useEffect} from 'react'
import { Alert, AlertTitle } from "@mui/material"
import { styleComponent } from './styles'
import { useTheme } from '@emotion/react'


type TControlProps = {
    setShow: (value: boolean) => void
    show: boolean
    delay: number
    title?: string
    message: string
    severity?: "error" | "warning" | "info" | "success"
}

function MessageToast({
    setShow,
    show,
    delay,
    title,
    message,
    severity
}: TControlProps) {
    const theme = useTheme()
    const [timer, setTimer] = useState<number>(0)
    const styles = styleComponent(theme)


    useEffect(() => {
        if (!show) {
            return
        }
        let startCount = true
        setTimer(delay)
       const interval = setInterval(() => {
            setTimer(prev => {
            if (prev === 0 && !startCount) {
                clearInterval(interval)
                setShow(false)
                return
            }
            startCount = false
               return !prev ? delay : prev - 1000
            })
        }, 1000)
    }, [show])

    
    return (
       timer ? 
       (
        <Alert
         
        sx={styles.messageToast}
        severity={severity}
        
        >
            {
                title ? <AlertTitle>{title}</AlertTitle> : null
            }
            {message}
        </Alert>
       ) : null
    )
}

export {
    MessageToast
}