import { IconButton, styled } from "@mui/material"

function FileUploader({onChange, children}) {
    return (
        <RelativeIconButton>
            <InputUpload multiple="multiple" type={'file'} onChange={onChange}/>
            {children}
        </RelativeIconButton>
    )
}

const RelativeIconButton = styled(IconButton)({
    position: 'relative',
})

const InputUpload = styled('input')({
    position: 'absolute',
    opacity: 0,
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    
})

export {
    FileUploader
}