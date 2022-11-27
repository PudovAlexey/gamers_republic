import DialogControl from "../../../../../../../../reusable/Dialog/DialogControl"

function Modal({items, show, setShowModal, renderItems}) {
    function onShowMoreImagesPress() {
        setShowModal(prev => !prev)
    }

    return (
       <DialogControl 
       open={show}
       setOpen={onShowMoreImagesPress}
       title={"Show"}
       >
             {renderItems(items)}
       </DialogControl>
    )
}

export {
    Modal
}