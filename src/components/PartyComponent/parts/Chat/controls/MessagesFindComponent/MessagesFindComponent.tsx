import { IconButton, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/typedReduxHooks";
import { toggleSearchPanel, onSearchMessageUp, onSearchMessageDown } from "../../store/chatSlice";
import { searchMessageIndexSelector, searchMessagesIdsSelector } from "../../store/selectors/chatSelector";


function MessagesFindComponent() {
    const dispatch = useAppDispatch()
    const searchMessagesSelector = useAppSelector(searchMessagesIdsSelector)
    const searchMessageNumber = useAppSelector(searchMessageIndexSelector)
    return (
        <Stack alignItems={'center'}  direction={'row'} justifyContent={'space-between'}>
            <Stack alignItems={'center'} direction={'row'} spacing={1}>
            <IconButton onClick={() => dispatch(onSearchMessageUp())}>
                <ArrowUpwardIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(onSearchMessageDown())}>
                <ArrowDownwardIcon/>
            </IconButton>
            <Typography>{searchMessageNumber}/{searchMessagesSelector.length}</Typography>
            </Stack>
            <IconButton onClick={() => dispatch(toggleSearchPanel())}>
                <CloseIcon/>
            </IconButton>
        </Stack>
    )
}

export {
    MessagesFindComponent
}