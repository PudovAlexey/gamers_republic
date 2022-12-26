import { ImageList, ImageListItem } from '@mui/material';

type TImageGalery = {
    images: {
        src: string, 
        alt: string
    }[],
    cols?: number
}

function ImageGalery({ images, cols = 2 }: TImageGalery) {
  return (
    <ImageList cols={images.length === 1 ? 1 : cols}>
      {images.map(({src, alt}) => (
        <ImageListItem key={src}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export { ImageGalery };
