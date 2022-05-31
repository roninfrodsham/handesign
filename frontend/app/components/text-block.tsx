import { createMarkup } from "../utils/misc";

export interface TextBlockProps {
  text: string;
}

function TextBlock({text}: TextBlockProps) {

  if(text == "") return null;

  const description = createMarkup(text);

  return (
    <div className="text-block">
      <div className="outer-container" dangerouslySetInnerHTML={description}></div>
    </div>
  );
}

export {TextBlock}