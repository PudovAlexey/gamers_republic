import { Box, styled } from "@mui/material";
import { useAppSelector } from "../../../../../../../../hooks/typedReduxHooks"
import { Image } from "../../../../../../../reusable/Image/Image";
import { AddsViewer } from "../../../addsViewer/AddsViewer";
const showPriority = ['img', 'audio']
function ShowFirstAdd() {
    const adds = useAppSelector(store => store.chatRedusers.chatSlice.replyAdds)
    if (!adds) return null
    return (
        <AddsContainer>
           <AddsViewer adds={adds}/>
        </AddsContainer>
    )
}

const AddsContainer = styled(Box)({
    maxWidth: '100px',
    height: 'auto'
})

export {
    ShowFirstAdd
}