import { Button, Modal, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import { useAppDispatch, useAppSelector } from "../../../../../../../../hooks/typedReduxHooks"
import { AudioGalery } from "../../../../../../../reusable/AudioGalery/AudioGalery"
import DialogControl from "../../../../../../../reusable/Dialog/DialogControl"
import { FileUploader } from "../../../../../../../reusable/FileUploader/FileUploader"
import { ImageGalery } from "../../../../../../../reusable/ImageGalery/ImageGalety"
import { UPLOAD_FILES } from "../../../../store/actionCreators"
import { inputMessage, onCliseCaptureModal } from "../../../../store/chatSlice"
import { addsSelector, countAddsSelector, messageInputSelector, showCaptureModalSelector } from "../../../../store/selectors/chatSelector"
import { AddsViewer } from "../../../addsViewer/AddsViewer"

function CaptureModal() {
    const adds = useAppSelector(addsSelector)
    const showCaptureModal = useAppSelector(showCaptureModalSelector)
    const countAdds = useAppSelector(countAddsSelector)
    const chatValue = useAppSelector(messageInputSelector)
    const dispatch = useAppDispatch()
    console.log(adds)
    return (
        <DialogControl
        customFooter={<ModalActions/>}
        title={`${countAdds} files selected`} 
        setOpen={() => dispatch(onCliseCaptureModal())} 
        open={showCaptureModal}>
            <SectionsMap/>
            <TextField label={'comment'} onChange={(e) => dispatch(inputMessage(e))} value={chatValue}/>
        </DialogControl>
    )
}

function SectionsMap() {
    const adds = useAppSelector(addsSelector)
    return (
        <Stack spacing={2}>
            {
                Object.keys(adds).map(type => {
                    switch(type) {
                        case 'img': return <ImageGalery images={adds[type].map(img => ({src: img, alt: 'name'}))}/>
                        case 'audio': return <AudioGalery audios={adds[type]}/>
                        default: return null
                    }
})
            }
        </Stack>
    )
}

function ModalActions() {
    const dispatch = useAppDispatch()
    return (
        <Stack width={'100%'} justifyContent={'space-between'} direction={'row'}>
            <Stack>
                <FileUploader onChange={(e) => dispatch({
                    type: UPLOAD_FILES,
                    payload: e
                })}>
                    Send
                </FileUploader>
            </Stack>
            <Stack justifyContent={'flex-end'} spacing={1} direction={'row'}>
                <Button>Cancel</Button>
                <Button variant="contained">Send</Button>
            </Stack>
        </Stack>
    )
}



export {
    CaptureModal
}