import { IconButton, styled } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from "@mui/system"
import { useMemo, useState } from "react"
import { Modal } from "./Modal/Modal";

function ShowMoreModal({maxShow, items, renderItems, showMoreButton}) {
    const [show, setShow] = useState<boolean>(false)
    const showPart = useMemo(() => {
        return items.reverse().slice(items.length - maxShow).reverse()
    }, [items, maxShow])
    function onOpenModal() {
        setShow(prev => !prev)
    }
    return (
        <Box onClick={showMoreButton ? null : onOpenModal}>
            {renderItems(showPart)}
            {items.length > maxShow && showMoreButton ? (
                <ShowMoreBlock>
                    <IconButton onClick={onOpenModal}>
                        <MoreHorizIcon/>
                    </IconButton>
                </ShowMoreBlock>
            ): null}
            {show && <Modal
                items={items}
                show={true}
                setShowModal={setShow}
                renderItems={renderItems}
            />}
        </Box>
    )
}

const ShowMoreBlock = styled(Box)(({ theme }) => ({
    background: "#1F2326",
    display: 'flex',
    justifyContent: 'center',
    height: '15px'
  }));

export {
    ShowMoreModal
}