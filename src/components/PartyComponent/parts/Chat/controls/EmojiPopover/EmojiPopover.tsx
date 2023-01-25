import { Popover } from "@mui/material"
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { INSERT_EMOJI } from "../../store/actionCreators";
import { toggleEmojiAnchor } from "../../store/chatSlice";
import { emojiAnchorSelector } from "../../store/selectors/chatSelector";

function EmojiPopover() {
    const dispatch = useAppDispatch()
    const anchor = useAppSelector(emojiAnchorSelector)
    if (!anchor) return null
    return (
        <Popover
        onClose={() => dispatch(toggleEmojiAnchor(null))}
        anchorEl={anchor}
        open={!!anchor}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
            <EmojiPicker
            onEmojiClick={(em) => dispatch(INSERT_EMOJI(em))}
            theme={Theme.DARK}
            />
        </Popover>
    )
}

export {
    EmojiPopover
}