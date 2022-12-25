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
            src={`${src}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={alt}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export { ImageGalery };
