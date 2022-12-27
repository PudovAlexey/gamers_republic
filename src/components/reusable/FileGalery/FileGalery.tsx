import { Button, IconButton, List, ListItem } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Stack } from "@mui/system";
import { DarkButton } from "../layout";

type TFyle = {
    name: string
    file: string
}

type TControlProps = {
    onRemove: (id: number) => void
    onUpdate: (id: number) => void
    onOpen: (id: number) => void
    files: TFyle[]
}

function FileGalery({files, onRemove, onUpdate, onOpen}: TControlProps) {
    return (
        <List>
            {
                files.map(({name, file, id}, idx) => (
                    <ListItem key={`${name}_${idx}`}>
                        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
                        <DarkButton onClick={() => onOpen(id)} startIcon={<DescriptionIcon color="primary"/>}>
                            {name}
                        </DarkButton>
                        <Stack direction={'row'} spacing={1}>
                            <IconButton onClick={() => onUpdate(id)}>
                                <SyncAltIcon/>
                            </IconButton>
                            <IconButton onClick={() => onRemove(id)}>
                                <DeleteOutlineIcon/>
                            </IconButton>
                        </Stack>
                        </Stack>
                    </ListItem>
                ))
            }
        </List>
    )
}



export {
    FileGalery
}