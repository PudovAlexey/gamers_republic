import { IconButton, useTheme } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from "@mui/system"
import { useMemo, useState } from "react"
import { Modal } from "./Modal/Modal";

function ShowMoreModal({maxShow, items, renderItems}) {
    const [show, setShow] = useState<boolean>(false)
    const showPart = useMemo(() => {
        return items.reverse().slice(items.length - maxShow).reverse()
    }, [items])

    function onOpenModal() {
        setShow(prev => !prev)
    }
    return (
        <Box>
            {renderItems(showPart)}
            {items.length > maxShow ? (
                <Box>
                    <IconButton onClick={onOpenModal}>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            ): null}
            <Modal
                items={items}
                show={show}
                setShowModal={setShow}
                renderItems={renderItems}
            />
        </Box>
    )
}

export {
    ShowMoreModal
}