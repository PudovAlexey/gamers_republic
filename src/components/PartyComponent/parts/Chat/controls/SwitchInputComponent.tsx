import { Paper, Slide } from "@mui/material"
import { styled } from "@mui/system";
import { useAppSelector } from "../../../../../hooks/typedReduxHooks";
import { replyHeightSelector, showReplySelector, showSearchPanelSelector } from "../store/selectors/chatSelector";
import { ChatInput } from "./ChatInput/ChatInput"
import { MessagesFindComponent } from "./MessagesFindComponent/MessagesFindComponent"

function SwitchInputComponent() {
    const replyHeight = useAppSelector(replyHeightSelector)
    const showReply = useAppSelector(showReplySelector)
    const InputPaper = styled(Paper)({
        background: '#1F2326',
        position: showReply ? 'absolute' : 'inherit',
        width: '100%',
        bottom: showReply && -(50 + replyHeight)
      });
    return (
        <InputPaper>
            <SwitchControl/>
        </InputPaper>
    )
}

function SwitchControl() {
    const showSearchComponent = useAppSelector(showSearchPanelSelector)
    if (showSearchComponent) {
        return (
            <Slide in={!showSearchComponent}>
                <MessagesFindComponent/>
            </Slide>
        )
    } else {
        return (
            <Slide in={showSearchComponent}>
                <ChatInput/>
            </Slide>
        )
    }
    
}

export {
    SwitchInputComponent
}