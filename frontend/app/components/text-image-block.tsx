import {Image} from "./image";
import type {ListItem} from '../types';
import { createMarkup } from "../utils/misc";

export interface TextImageBlockProps {
  blockData: {
    title: string;
    description: string;
    imageData: ListItem;
  }
}

function TextImageBlock({blockData}: TextImageBlockProps) {

  let description = (blockData.description !== null) ? blockData.description : "";

  const markUp = createMarkup(`<h1>${blockData.title}</h1>${description}`);

  return (
    <div className="outer-container">
      <div className="container flex">
        <div className="description" dangerouslySetInnerHTML={markUp}></div>
        <Image imageData={blockData.imageData} />
      </div>
    </div>
  );
}

export {TextImageBlock}