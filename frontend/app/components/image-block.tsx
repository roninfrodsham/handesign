import { Image } from "./image";
import type { ListItem } from '~/types';

export interface ImageBlockProps {
  imageData: Array<ListItem>
}

function ImageBlock({imageData}: ImageBlockProps) {
  return (
    <div className="outer-container">
      <div className="container flex">
        {imageData.length > 0 ? (
          imageData.map((image, index) => {
            const key = `${imageData.length}-${index}`;
            return (
              <Image imageData={image} key={key} />
            )
          })
        ) : null}
      </div>
    </div>
  );
}

export { ImageBlock }