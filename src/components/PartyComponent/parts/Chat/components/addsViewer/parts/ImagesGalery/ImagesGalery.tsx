import { IconButton, useTheme } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/system';
import { useMemo, useState } from 'react';
import { ImageGalery } from '../../../../../../../reusable/ImageGalery/ImageGalety';
import { Modal } from './Modal/Modal';
import { styleComponent } from '../../../../styles';

type TControlProps<T> = {
    items: T[]
    maxShow: number
    renderItems: (items: T[]) => JSX.Element
}

function ShowMoreModal({ items, maxShow, renderItems }: TControlProps<any>) {
  const [showModel, setShowModal] = useState(false);
  const theme = useTheme()
  const styles = styleComponent(theme)
  const firstPart = useMemo(
    () =>
    items
        .reverse()
        .slice(items.length - maxShow)
        .reverse(),
    [items]
  );

  function onShowMoreImagesPress() {
    setShowModal((prev) => !prev);
  }

  return (
    <Box>
        {renderItems(firstPart)}
      {items.length > maxShow ? (
        <Box sx={ styles.showAdd}>
          <IconButton aria-label="show-more" onClick={onShowMoreImagesPress}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ) : null}
      <Modal
        renderItems={renderItems}
        setShowModal={setShowModal}
        items={items}
        show={showModel}
      />
    </Box>
  );
}

export { ShowMoreModal };
