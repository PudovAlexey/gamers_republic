import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type TControlProps = {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  children: JSX.Element
  customFooter?: JSX.Element
  dialogActions?: {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }[];
};

function DialogControl({
  title,
  children,
  open,
  setOpen,
  dialogActions,
  customFooter
}: TControlProps) {
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>
        {title || ''}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {dialogActions && dialogActions.length ? (
        <DialogActions>
          {(dialogActions || []).map((action, idx) => {
            return (
              <Button key={`action-${idx}`} onClick={action.onClick}>
                {action.text}
              </Button>
            );
          })}
        </DialogActions>
      ) : null}
      {customFooter}
    </Dialog>
  );
}

export default DialogControl;
