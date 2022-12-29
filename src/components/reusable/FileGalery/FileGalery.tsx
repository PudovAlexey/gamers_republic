import { Button, IconButton, List, ListItem } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Stack } from "@mui/system";
import { DarkButton } from "../layout";
import { FileUpload } from "@mui/icons-material";

type TFyle = {
    name: string
    file: string
}

type TControlProps = {
    onRemove: (id: number, type: 'file') => void
    onUpdate: (id: number, type: 'file') => void
    onOpen: (id: number, type: 'file') => void
    files: TFyle[]
    edit?: boolean
}

function FileGalery({files, onRemove, onUpdate, onOpen, edit = false}: TControlProps) {
    return (
        <List>
            {
                files.map(({name, file, id}, idx) => (
                    <ListItem key={id} key={`${name}_${idx}`}>
                        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
                        <DarkButton onClick={() => onOpen(id, 'file')} startIcon={<DescriptionIcon color="primary"/>}>
                            {name}
                        </DarkButton>
                        {
                            edit && (<Stack direction={'row'} spacing={1}>
                            <FileUpload onClick={(e) => onUpdate(e, id, 'file')}>
                                <SyncAltIcon/>
                            </FileUpload>
                            <IconButton onClick={() => onRemove(id, 'file')}>
                                <DeleteOutlineIcon/>
                            </IconButton>
                        </Stack>)
                        }
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