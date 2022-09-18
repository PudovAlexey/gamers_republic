import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close";

function DialogControl({title, children, open, setOpen, dialogActions}) {
    const handleClose = () => {
        setOpen(!open)
      };
    return (
        <Dialog open={open}>
        <DialogTitle>
            {title || ""}
            <IconButton aria-label="close" onClick={handleClose}><CloseIcon/></IconButton>
            </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        {dialogActions && dialogActions.length ? 
        <DialogActions>
            {dialogActions.map((action, idx) => {
                return <Button key={`action-${idx}`} onClick={action.onClick}>{action.text}</Button>
            })}
        </DialogActions>
        : null}
    </Dialog>
    )
}

export default DialogControl