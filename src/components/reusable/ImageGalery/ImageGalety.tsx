import { IconButton, ImageList, ImageListItem, styled } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack } from '@mui/system';
import { FileUploader } from '../FileUploader/FileUploader';

type TImageGalery = {
  edit?: boolean
  onRemove: (id: number, type: 'img') => void;
  onUpdate: (e: any, id: number, type: 'img') => void;
  onOpen: (id: number, type: 'img') => void;
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
  edit = false
}: TImageGalery) {
  return (
    <ImageList cols={images.length === 1 ? 1 : cols}>
      {images.map(({ file, name, id }) => (
        <IMageGaleryItem key={name}>
          <img
            onClick={() => onOpen(id, 'img')}
            src={file}
            alt={name}
            loading="lazy"
          />
          {edit && (<ImageIcons direction={'row'} spacing={1}>
            <FileUploader onChange={(e) => onUpdate(e, id, 'img')}>
              <SyncAltIcon />
            </FileUploader>
            <IconButton onClick={() => onRemove(id, 'img')}>
              <DeleteOutlineIcon />
            </IconButton>
          </ImageIcons>)}
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
