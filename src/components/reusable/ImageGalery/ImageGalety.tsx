import { IconButton, ImageList, ImageListItem, styled } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack } from '@mui/system';

type TImageGalery = {
  onRemove: (id: number) => void;
  onUpdate: (id: number) => void;
  onOpen: (id: number) => void;
  images: {
    file: string;
    name: string;
  }[];
  cols?: number;
};

function ImageGalery({
  images,
  cols = 2,
  onOpen,
  onRemove,
  onUpdate,
}: TImageGalery) {
  return (
    <ImageList cols={images.length === 1 ? 1 : cols}>
      {images.map(({ file, name, id }) => (
        <IMageGaleryItem key={name}>
          <img
            onClick={() => onOpen(id)}
            src={file}
            alt={name}
            loading="lazy"
          />
          <ImageIcons direction={'row'} spacing={1}>
            <IconButton onClick={() => onUpdate(id)}>
              <SyncAltIcon />
            </IconButton>
            <IconButton onClick={() => onRemove(id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </ImageIcons>
        </IMageGaleryItem>
      ))}
    </ImageList>
  );
}

const IMageGaleryItem = styled(ImageListItem)({
  position: 'relative',
});

const ImageIcons = styled(Stack)({
  position: 'absolute',
  top: '15px',
  right: '15px',
});

export { ImageGalery };
